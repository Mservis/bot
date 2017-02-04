package IE8;

//import java.util.regex.Pattern;
import java.io.IOException;
import java.sql.*;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mysql.fabric.jdbc.FabricMySQLDriver;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.SystemClock;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.*;
import org.stringtemplate.v4.ST;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.openqa.selenium.support.ui.ExpectedConditions.frameToBeAvailableAndSwitchToIt;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfNestedElementLocatedBy;

public class timeControlAllLots {
    private Statement statement;
    private WebElement element;
    private WebDriverWait wait;
    private Driver DBdriver;
    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private String nomerZayavki, BaseUrl;
    private float[] procentPonigeniya;
    private int []lot;
    private int []shag;
    private int vsegolotov;
    private double []StarayaCena;
    private long zakupka;
    private Connection connection;
    private Region okwindow;
    private double []onlinecena;
    private Date date; private boolean ponastoyashemu;
    private int poryadkovinomercenovogo;
    private Pattern ok2,inputPass,ok3,gotovotpravit,podpisat, input2, ok4, otpravit, otpravil, pwdOk, pustoijava, gotovpodpisat, postavshik;
    @Before
    public void setUp() throws Exception {
        // nastroiki
        ponastoyashemu = true;
        zakupka = 294525;
        poryadkovinomercenovogo = 1; //ценовое которое нажметься на старте бывает что оно вторым оказываетья
        vsegolotov = 2;
        lot = new int[vsegolotov];
        lot[0]=1;
        lot[1]=2;
        /*lot[2]=3;
        lot[3]=4;*/
        StarayaCena = new double[vsegolotov];
        shag = new int[vsegolotov];
        onlinecena = new double[vsegolotov];

        driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        DBdriver = new FabricMySQLDriver();
        DriverManager.registerDriver(DBdriver);
        wait = new WebDriverWait(driver, 30000);
        connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
        date = new Date();
        procentPonigeniya = new float[19];
        //float korekciya = 0.000001f;
        float korekciya = 0.004f;
        procentPonigeniya[0] = 0.95f + korekciya;
        procentPonigeniya[1] = 0.947368f + korekciya;
        procentPonigeniya[2] = 0.944444f + korekciya;
        procentPonigeniya[3] = 0.941176f + korekciya;
        procentPonigeniya[4] = 0.9375f + korekciya;
        procentPonigeniya[5] = 0.933333f + korekciya;
        procentPonigeniya[6] = 0.928571f + korekciya;
        procentPonigeniya[7] = 0.923077f + korekciya;
        procentPonigeniya[8] = 0.916667f + korekciya;
        procentPonigeniya[9] = 0.909091f + korekciya;
        procentPonigeniya[10] = 0.9f + korekciya;
        procentPonigeniya[11] = 0.888889f + korekciya;
        procentPonigeniya[12] = 0.875f + korekciya;
        procentPonigeniya[13] = 0.857143f + korekciya;
        procentPonigeniya[14] = 0.833333f + korekciya;
        procentPonigeniya[15] = 0.8f + korekciya;
        procentPonigeniya[16] = 0.75f + korekciya;
        procentPonigeniya[17] = 0.666667f + korekciya;
        procentPonigeniya[18] = 0.5f + korekciya;

    }

    @Test
    public void slediZaVremenem() throws Exception {
        recperemStarayaCena();
        for (int ilot=0;ilot<vsegolotov;ilot++)
        {
            shag[ilot]=0;
            onlinecena[ilot]=StarayaCena[ilot];
            recShag(shag[ilot],lot[ilot]);
            System.out.println("Онлай цена  для лота №" + lot[ilot] + " = " + onlinecena[ilot]);
            System.out.println("Старая цена для лота №" + lot[ilot] + " = " + StarayaCena[ilot]);
            System.out.println("Шаг для лота №" + lot[ilot] + " = " + shag[ilot]);
            System.out.println("Процент понижения для лота №" + lot[ilot] + " = " + procentPonigeniya[shag[ilot]]);
            System.out.println("Сдедующий процент понижения для лота №" + lot[ilot] + " = " + procentPonigeniya[shag[ilot]+1]);
        }
        auth();
        int pause = 0;
        while (pause == 0) {
            if (ponastoyashemu)chatatvremyaend();
            for (int ilot=0;ilot<vsegolotov;ilot++)
            {
                if (ponastoyashemu)chitatcenu(ilot);
                else chitavirtualtcenu(ilot);
                if (onlinecena[ilot] != StarayaCena[ilot]){
                    StarayaCena[ilot] = onlinecena[ilot];
                    shag[ilot]++;
                    System.out.println("Онлай цена " + lot[ilot] + " = "+onlinecena[ilot]);
                    System.out.println("Старая цена " + lot[ilot] + " = "+StarayaCena[ilot]);
                    System.out.println("Шаг " + lot[ilot] + " = " + shag[ilot]);
                    System.out.println("Процент понижения " + lot[ilot] + " = " + procentPonigeniya[shag[ilot]]);
                    System.out.println("Сдедующий процент понижения " + lot[ilot] + " = " + procentPonigeniya[shag[ilot]+1]);
                }


                if (ponastoyashemu)System.out.println("Время завершения = "+ date.getTime());
            }
            allrec();
            pause = 0;
            Thread.sleep(500);
            if(ponastoyashemu)driver.findElement(By.id("intervalButton")).click();
        }
        //ProcessBuilder builder = new ProcessBuilder( new String[] { "cmd.exe", "ping 192.168.0.12"});
        //builder.start();

        /*try {
            builder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
        builder = new ProcessBuilder(
                new String[] { "cmd.exe", "/C",
                        "time "+sdfd.format(time)});
        try {
            builder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }*/

    }
    @After
    public void tearDown() throws Exception {
        driver.quit();
        String verificationErrorString = verificationErrors.toString();
        if (!"".equals(verificationErrorString)) {
            fail(verificationErrorString);
        }
    }
    private void recShag(int nshag, int nlot){
        String recShag = "update setup set shag = ?, procent = ?, nextprocent = ? where nomerzakupki =" + zakupka + " AND lot = "+nlot;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement =  connection.prepareStatement(recShag);
            preparedStatement.setInt(1,nshag);
            preparedStatement.setFloat(2,procentPonigeniya[nshag]);
            preparedStatement.setFloat(3,procentPonigeniya[nshag+1]);
            preparedStatement.execute();
            //connection.close();
        } catch (SQLException e) {
            System.err.println("Не удлаось подключиться к драйверу базы данных");
        }
        System.out.println("Записал шаг");
    }
    private void recperemStarayaCena(){
        //for (int i = 0; i<vsegolotov;i++) {
        try {
            //System.out.println("Заход "+i);
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + zakupka);
            while (resultSet.next()) {
                int templot = resultSet.getInt("lot");
                double cenalota = resultSet.getDouble("cena");
                for (int ilot = 0; ilot< vsegolotov; ilot++)
                {
                    if (lot[ilot] == templot) {
                        StarayaCena[ilot] = cenalota;
                        System.out.println("Прочитал цену для лота №" + templot + " = " + StarayaCena[ilot]);
                    }
                }
                //StarayaCena[resultSet.getInt("lot")-1] =  resultSet.getLong("cena");
                //
            }
            //System.out.println("Резульат 2"+ resultSet.getString(2));
            //connection.close();
        } catch (SQLException e) {
            System.err.println("Не удлаось подключиться к драйверу базы данных");
        }

        //}
    }
    private void SikuliModalWidow() throws Exception {
        System.out.println("sikulimodal");
        okwindow.setRect(754, 485, 115, 73);
        System.out.println("setrec");
        okwindow.wait(ok2, 10000);
        System.out.println("wait");
        okwindow.click(ok2);

    }
    private void chitatcenu(int ilot)
    {
        // driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).click();
        // String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        //element = wait.until(presenceOfElementLocated(By.id("N70:BEST_BID_PRICE:0")));
        // 2 это первая строка, 3 вторая и т.д.
        element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[" + (2+ilot) + "]/td[6]/span")));
        //убрал String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        try {
            String myrez0 = element.getText();
            String str = "";
            int i = 0;
            for (i = 0; myrez0.charAt(i) != ' '; i++) {
                if (myrez0.charAt(i) != ',') {
                    str += myrez0.charAt(i);
                }
            }

            onlinecena[ilot] =  Double.parseDouble(str);

        } catch (NoSuchElementException e) {

        } catch (UnhandledAlertException e) {

        } catch (StaleElementReferenceException e) {

        } catch (ElementNotVisibleException e) {

        } catch (JavascriptException e){

        }



    }
    private void chitavirtualtcenu(int ilot)
    {
        try {
            //System.out.println("Заход "+i);
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + zakupka+ " AND lot = "+lot[ilot]);
            while (resultSet.next()) {
                onlinecena[ilot] = resultSet.getDouble("cenavirtual");
                System.out.println("Вирутальная цена = "+onlinecena[ilot]);
            }
            //System.out.println("Резульат 2"+ resultSet.getString(2));
            //connection.close();
        } catch (SQLException e) {
            System.err.println("Не удлаось подключиться к драйверу базы данных");
        }

    }
    private void chatatvremyaend(){
        //tr[@id='CloseDate__xc_']/td[3]/span
        int hh = 0;
        int mm = 0;
        element = wait.until(presenceOfElementLocated(By.xpath("//tr[@id='CloseDate__xc_']/td[3]/span")));
        //убрал String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        try {
            String myrez0 = element.getText();
            System.out.println(myrez0);
            String minstr = "";
            String hourstr = "";
            int i = 0;
            for (i = 0; i<19; i++) {
                //if (myrez0.charAt(i) != ',')
                if (i >= 11 && i < 13)
                {
                    hourstr += myrez0.charAt(i);
                }
                if (i >= 14 && i < 16)
                {
                    minstr += myrez0.charAt(i);
                }
            }
            System.out.println(hourstr);
            System.out.println(minstr);
            date.setHours(Integer.parseInt(hourstr));
            date.setMinutes(Integer.parseInt(minstr));
            date.setSeconds(0);

        } catch (NoSuchElementException e) {

        } catch (UnhandledAlertException e) {

        } catch (StaleElementReferenceException e) {

        } catch (ElementNotVisibleException e) {

        } catch (JavascriptException e){

        }
    }
    private void allrec() {
        // int etap = 0;
        for (int i = 0; i < vsegolotov;i++) {
            //recShag(shag[i],lot[i]);
            String Allrec = "update setup set cena = ?, timeend = ?,shag = ?, procent = ?, nextprocent = ? where nomerzakupki =" + zakupka + " AND lot = "+lot[i];
            PreparedStatement preparedStatement = null;
            try {
                preparedStatement = connection.prepareStatement(Allrec);
                preparedStatement.setDouble(1, onlinecena[i]);
                long vrem = date.getTime();
                java.sql.Time sqlTime = new java.sql.Time(vrem);
                preparedStatement.setTime(2, sqlTime);
                preparedStatement.setInt(3,shag[i]);
                preparedStatement.setFloat(4,procentPonigeniya[shag[i]]);
                preparedStatement.setFloat(5,procentPonigeniya[shag[i]+1]);
                preparedStatement.execute();
                //connection.close();
            } catch (SQLException e) {
                System.err.println("Не удлаось подключиться к драйверу базы данных");

            }
        }
    }
    private void chitatvremia()throws Exception{
        Thread.sleep(2000);
        boolean probel = false;
        String ostalos =  driver.findElement(By.id("TimeLeft")).getText();
        String konec = driver.findElement(By.id("N")).getText();
        String vremyakonec = "";
        for (int i = 0; i< konec.length();i++)
        {

            if((konec.charAt(i) == ' ')&&(!probel))
            {
                probel = true;
                i++;
            }
            if(probel) vremyakonec += konec.charAt(i);
        }

        int hhOst = Integer.parseInt("" + ostalos.charAt(0) + ostalos.charAt(1));
        System.out.println(hhOst);
        int mmOst = Integer.parseInt("" + ostalos.charAt(3) + ostalos.charAt(4));
        System.out.println(mmOst);
        int ssOst = Integer.parseInt("" + ostalos.charAt(6) + ostalos.charAt(7));
        System.out.println(ssOst);
        int hhKon = Integer.parseInt("" + vremyakonec.charAt(0) + vremyakonec.charAt(1));
        System.out.println(hhKon);
        int mmKon = Integer.parseInt("" + vremyakonec.charAt(3) + vremyakonec.charAt(4));
        System.out.println(mmKon);
        int ssKon = Integer.parseInt("" + vremyakonec.charAt(6) + vremyakonec.charAt(7));
        System.out.println(ssKon);
        int ssServ = 0;
        int mmServ = 0;
        int hhServ = 0;
        if (ssKon < ssOst)
        {
            ssServ = ssKon + 60 - ssOst;
            if (mmKon == 0)
            {
                hhKon--;
                mmKon += 59;
            }
            else
            {
                mmKon--;
            }
        }
        else ssServ = ssKon-ssOst;
        // System.out.println("Время сервера нооборот столбиком сек мин час");
        // System.out.println(ssServ);
        if (mmKon<mmOst)
        {
            mmServ = mmKon + 60 - mmOst;
            hhKon--;
        }
        else mmServ = mmKon  - mmOst;
        //  System.out.println(mmServ);

        if (hhKon < hhOst)  hhServ = hhKon-hhOst+12;
        else hhServ = hhKon-hhOst;
        // System.out.println(hhServ);
        String hhStr,mmStr,ssStr = "";
        if (hhServ < 10) hhStr = "0"+hhServ;
        else hhStr = ""+ hhServ;
        if (mmServ < 10) mmStr = "0"+mmServ;
        else mmStr = "" + mmServ;
        if (ssServ < 10) ssStr = "0"+ssServ;
        else ssStr = "" + ssServ;

        System.out.println("Время сервера      "+ hhStr+":"+mmStr+":"+ssStr);

        Date time = new Date(System.currentTimeMillis());
        SimpleDateFormat sdf= new SimpleDateFormat(" HH:mm:ss ");
        System.out.println("Системное время   "+ sdf.format(time));
        System.out.println(ostalos);
        System.out.println(konec);
        System.out.println(vremyakonec);
        SimpleDateFormat sdfd= new SimpleDateFormat(" HH:mm:ss ");




        // ProcessBuilder builder = new ProcessBuilder( new String[] { "cmd.exe", "/C", "time "+sdf.format(time)});
       /* String[] args = {"cmd.exe", "/C", "time "+sdf.format(time)};
        java.lang.Runtime.getRuntime().exec(args);*/

    }
    private void auth() throws Exception
    {
        driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        driver.findElement(By.xpath("//tr["+(1 + poryadkovinomercenovogo)+"]/td/a")).click();
        if (ponastoyashemu){
            driver.findElement(By.id("MonitorBiddingBtn")).click();
            Thread.sleep(9000);
        }

    }
    private boolean isElementPresent(By by) {
        try {
            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    private String closeAlertAndGetItsText() {
        try {
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            if (acceptNextAlert) {
                alert.accept();
            } else {
                alert.dismiss();
            }
            return alertText;
        } finally {
            acceptNextAlert = true;
        }
    }

}
