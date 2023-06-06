var urlopen = require ('urlopen');

// define the urlopen options
var options = {
    target: 'local:///XSLT/duarte.xml',
    // method is optional. By default, method is get.
    method: 'get',
};

urlopen.open (options, function (error, response) {
    if (error) {
        // an error occurred during reading the file
        session.output.write (error.errorMessage);
    } else {
        var responseStatusCode = response.statusCode;
        if (responseStatusCode == 200) {
            response.readAsXML(function(error, NodeList) {
                if (error) {
                    // error while reading response or transferring data to Buffer
                    session.output.write (error.errorMessage);
                } else {									
                    session.output.write(NodeList);
                } 
            });
        } else {
            session.output.write ("urlopen target return statusCode " + responseStatusCode);
        }
    }
}); // end of urlopen.open()