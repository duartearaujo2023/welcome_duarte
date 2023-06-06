<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:math="http://exslt.org/math" xmlns:dp="http://www.datapower.com/extensions" extension-element-prefixes="dp math">
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>

<xsl:template match="messages">
        <xsl:call-template name="pick-random">
            <xsl:with-param name="node-set" select="message"/>
            <xsl:with-param name="quota" select="1"/>
        </xsl:call-template>
</xsl:template>

<xsl:template name="pick-random">
    <xsl:param name="node-set"/>
    <xsl:param name="quota"/>
    <xsl:param name="selected" select="dummy-node"/>    
    <xsl:choose>
        <xsl:when test="count($selected) &lt; $quota and $node-set">
            <xsl:variable name="set-size" select="count($node-set)"/>    
            <xsl:variable name="rand" select="floor(math:random() * $set-size) + 1"/>       
            <!-- recursive call -->
            <xsl:call-template name="pick-random">
                <xsl:with-param name="node-set" select="$node-set[not(position()=$rand)]"/>
                <xsl:with-param name="quota" select="$quota"/>
                <xsl:with-param name="selected" select="$selected | $node-set[$rand]"/>         
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:copy-of select="$selected"/>
        </xsl:otherwise>
     </xsl:choose>
</xsl:template>

</xsl:stylesheet>