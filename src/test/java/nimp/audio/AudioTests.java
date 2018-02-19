package nimp.audio;

import mockit.integration.junit4.JMockit;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static junit.framework.TestCase.assertTrue;

@RunWith(JMockit.class)
public class AudioTests {

        static final Logger logger = LoggerFactory.getLogger(AudioTests.class);


        @Test
    public void cutAudio()
    {
        assertTrue(false);
    }
    @Test
    @Ignore
        public void InsertInDatabase() throws SQLException, ClassNotFoundException, CharacterCodingException, UnsupportedEncodingException {
        Connection  conn = this.initConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://xxxxxxxxxx:xxxxx/xxx", "xxxxxxxx", "xxxxxxxx");
        String requete = "update alo_project set fileActAnnot=? where id ='xxxxxxxxx'";
        logger.info(requete);
        CharsetEncoder utf8Encoder = Charset.forName("utf-8").newEncoder();
        InputStream inputStream = new ByteArrayInputStream(requete.getBytes());

        InputStreamReader inputStreamReader = new InputStreamReader(inputStream, Charset.forName("UTF-8"));
        byte[] bytes = utf8Encoder.encode(CharBuffer.wrap(requete.toCharArray())).array();
        /*String requete2 = new String(bytes); // on reconverti de utf8-> utf16: le string en fait devient du n"importe quoi.
        requete2 = new String (requete.getBytes(), "ISO-8859-1" ); // marche !*/
        //logger.info(requete2);
        /*// on converti un string en ISO puis en UTF-8 (pas sur que ca marche puisque un string est toujours en utf16)
        4)			String stringISO = new String (query.getBytes(), "ISO-8859-1" );
        5)			String stringUTF8 = new String (bytes, "UTF-8" );
        unicode -> UTF-8
*/
      PreparedStatement prep = conn.prepareStatement(requete);
        String stringISO = new String ("xxxxxxxxxxxx".getBytes(), "ISO-8859-1" ); // marc
      prep.setString(1,stringISO);
        prep.execute();


    }
    public Connection initConnection(String driver, String url, String user, String password) throws ClassNotFoundException, SQLException {
        // ou driver c'est oracle.jdbc.driver.OracleDriver pour oracle.
        Connection conn = null;
        try{
            logger.debug("Openinig DB Connection");
            Class.forName(driver);
            conn = DriverManager.getConnection(url, user, password);
        }catch (ClassNotFoundException ce){
            logger.error("Oracle Driver not found: " + ce);
            throw ce;
        }catch (SQLException se){
            logger.error("Unable to connect with the Oracle DataBase:" + se);
            throw se;
        }catch (Throwable se){
            logger.error("Unable to connect with the Oracle DataBase:" + se);
            throw se;
        }finally{
            return conn;
        }
    }


}
