var urlopen = require ('urlopen');

// define the urlopen options
var options = {
    target: 'local:///JSON/duarte.json',
    // method is optional. By default, method is get.
    method: 'get',
};

// open connection to target
urlopen.open (options, function (error, response) {
    if (error) {
        // an error occurred during reading the file
        session.output.write ("urlopen error: " + JSON.stringify(error));
    } else {
        // read response data
        // response.statusCode === 200: Successfully open file
        // response.statusCode === 403: Permission denied (e.g. store:///dp is write only, cannot read)
        // response.statusCode === 404: File not found
        // response.statusCode === 500: Other open file error
        var responseStatusCode = response.statusCode;
        if (responseStatusCode == 200) {
            response.readAsJSON(function(error, responseData) {
                if (error) {
                    // error while reading response or transferring data to Buffer
                    session.output.write("readAsBuffer error: " + JSON.stringify(error));
                } else {
					
					const rand = responseData[Math.floor(Math.random() * responseData.length)]											
                    session.output.write(rand);
                } 
            });
        } else {
            session.output.write ("urlopen target return statusCode " + responseStatusCode);
        }
    }
}); // end of urlopen.open()