package IE8;

//import java.util.regex.Pattern;

//import HelperBasePakage.SikuliHelper;
import com.mysql.fabric.jdbc.FabricMySQLDriver;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.Keys;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.SystemClock;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.sikuli.script.*;

import static org.openqa.selenium.support.ui.ExpectedConditions.elementSelectionStateToBe;
import  static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

//import java.sql.Time;
import java.sql.*;
import java.util.Date;
import java.text.SimpleDateFormat;;
import java.util.Random;
//import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;

public class yavnoe_ogidanie {
    private WebDriver driver;
    private String baseUrl, nomerZayavki;
    private WebDriverWait wait;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private WebElement element;
    private long nachalotesta, nachalovsegotesta;
    private double sredneePodachi, sredneeUdalenia, minPodachi, maxPodachi, minUdalenia, maxUdalenia;
    private int nomercenovogo, dostarta, nomerpodayshego, iPovtor;
    private Region okwindow;
    private Pattern ok2,inputPass,ok3,gotovotpravit,podpisat, input2, ok4, otpravit, otpravil, pwdOk, pustoijava, gotovpodpisat, postavshik;
    private long zakupka;
    private Driver DBdriver;
    private Connection connection;
    private PreparedStatement preparedStatement;
    private Statement statement;
    private long [] cenalota, staryacenalota;
    private int [] lot;
    private float[] procent, skidka;
    @Before
    public void setUp() throws Exception {
        //Гуцалов
    nomerZayavki = "1118470"; //номер заявки в которой учавствует
    zakupka = 289323;//номер закупки
    dostarta = 67; //за сколько секунд до окончания нужно подать заявку
    nomerpodayshego = 2; // каким будет этот комп первым или вторым, если первый то он подаеться как настанет время, если второй то когда поменяеться цена в момент того как подаеться первый
    lot = new int[1];// количество лотов
    lot[0] = 1;//номер лота в заявке
    //lot[1] = 2;//номер лота в заявке
    nomercenovogo = 2; //каким номером по счету будет в ценовое предложене в общем списке с пркикрипленными файлами.
        cenalota = new long[lot.length];
        procent = new float[lot.length];
        skidka = new float[lot.length];
        staryacenalota = new long[lot.length];
        driver = new InternetExplorerDriver();
        wait = new WebDriverWait(driver, 30000);
        okwindow = new Region(91,49,95,36);
        sredneePodachi = 0;
        sredneeUdalenia =0;
        minPodachi = 100;
        maxPodachi = 0;
        minUdalenia = 100;
        maxPodachi = 0;
        ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        inputPass = new Pattern("c:\\forsikuli\\ie8\\pass.png");
        ok3 = new Pattern("c:\\forsikuli\\ie8\\ok2.png");
        gotovotpravit = new Pattern("c:\\forsikuli\\gotovotpravit.png");
        podpisat = new Pattern("c:\\forsikuli\\ie8\\podpisat.png");
        input2 = new Pattern("c:\\forsikuli\\input2.png");
        ok4 = new Pattern("c:\\forsikuli\\ie8\\ok3.png");
        otpravit = new Pattern("c:\\forsikuli\\otpravit.png");
        otpravil = new Pattern("c:\\forsikuli\\ie8\\otpravil.png");
        pwdOk = new Pattern("c:\\forsikuli\\ie8\\pwdOk.png");
        //pustoijava = new Pattern("c:\\forsikuli\\ie8\\pustoijava.png");
        pustoijava = new Pattern("c:\\forsikuli\\ie8\\pustoijava2.png");
        gotovpodpisat = new Pattern("c:\\forsikuli\\ie8\\gotovpodpisat.png");
        postavshik = new Pattern("c:\\forsikuli\\ie8\\postavshik.png");
        DBdriver = new FabricMySQLDriver();
        DriverManager.registerDriver(DBdriver);
        connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
        }

    @Test
    public void IE8_sozdat_cenovoe() throws Exception {
        nomercenovogo--;
        nachalovsegotesta = System.currentTimeMillis();

        auth(); //1 этап
        /*for (iPovtor = 0; iPovtor<1200; iPovtor++)
        {*/

        //gdemfas();

        zapolnitLoti(); //2 этап
        nagatprodolgit();//3 этап
        nagatSozatcenovoe();//4 этап
        podpisatCenovoe();//5 этап
        SikuliModalWidow();//добавить проверку в конце в друг цена поменялась
        //SikuliJavaPwd();//добавить проверку в конце в друг цена поменялась
      // убрал на тендере  proverkaNaitiPodpisat();//добавить проверку в конце в друг цена поменялась
        SikuliPodpisatButton();//добавить проверку в конце в друг цена поменялась
        SikuliJavaPwd2();//добавить проверку в конце в друг цена поменялась
        SikuliJavaOtpravitButton();//добавить проверку в конце в друг цена поменялась

        nagatotpravit();
        pokazatskorostPodachi();//добавить проверку в конце в друг цена поменялась
        Thread.sleep(9000);
      /*  zaitivzayavku();
        udalizayavku();
        pokazatskorosUdaleniya();
        zaitivzayavku();
        nagatstroki();*/
       // }
    }

    @After
    public void tearDown() throws Exception {
        driver.quit();
        String verificationErrorString = verificationErrors.toString();
        if (!"".equals(verificationErrorString)) {
            fail(verificationErrorString);
        }
    }
    private void gdemstart() throws InterruptedException{
        long sechas = 0;
        long nachalo = 0;
        boolean perv = false;
        do {
            try {

                //connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
                statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + zakupka + " AND lot = 1");
                while (resultSet.next()) {
                    Time timeend = resultSet.getTime("timeend");
                    nachalo = ((timeend.getHours() * 60 + timeend.getMinutes()) * 60 + timeend.getSeconds()-dostarta);
                    Date date = new Date();
                    sechas = ((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds());
                }
            } catch (SQLException e) {
                System.err.println("Не удлаось подключиться к драйверу базы данных");
            }
            System.out.println("Осталось " +(nachalo - sechas));

            if (perv) Thread.sleep(500);
            perv = true;
        } while (nachalo > sechas);
        System.out.println("Старт ");
    }
    private void recstaraycena()
    {
        recperem();
        for (int i = 0; i <lot.length; i++)
        {
            staryacenalota[i] = cenalota[i];
        }
    }
    private void gdempervogo() throws InterruptedException{
        int etap = 0;
        boolean perv = false;
        do {
            try {
                statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + zakupka + " AND lot = 1");
                while (resultSet.next()) {
                    etap = resultSet.getInt("etap");
                }
            } catch (SQLException e) {
                System.err.println("Не удлаось подключиться к драйверу базы данных");
            }
            if (perv) Thread.sleep(300);
            perv = true;
            System.out.println("Этап = " + etap);
        } while (etap != 2); // ждем пока первый комп не уйдет на второй этап(т.е. начнет подоваться)
    }

    private void nagatotpravit(){
        driver.findElement(By.id("SubmitBtn")).click();
    }
    private void gdemizmeneniyaceni() throws InterruptedException {
        //два условия - этап != 0(Заначит глпавный уже подаеться) или поменялась цена
        int cenapom = 0;
        boolean perv = false;
        recstaraycena();
    do{
      cenapom = cenapomenyalas();
      System.out.println("Цена поменялась = " + cenapom);

      if (perv) Thread.sleep(500);
      perv = true;
  }while (cenapom == 0 ); // если цена поменялась но продолжать можно тогда 1, если цена помянялась ниже чем моя тогда 2, если нет то 0
        System.out.println("Выхожу из цена поменялась");
 // }while (cenapom == 0); // если цена поменялась но продолжать можно тогда 1, если цена помянялась ниже чем моя тогда 2, если нет то 0
    }
    private void recperem(){
        for (int i = 0; i<lot.length;i++) {
            try {
                statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + zakupka + " AND lot = " + lot[i]);
                while (resultSet.next()) {
                    cenalota[i] =  resultSet.getLong("cena");
                    procent[i] = resultSet.getFloat("procent");
                    skidka[i] = resultSet.getFloat("skidka");
                }
                //System.out.println("Резульат 2"+ resultSet.getString(2));
                //connection.close();
            } catch (SQLException e) {
                System.err.println("Не удлаось подключиться к драйверу базы данных");
            }

        }
    }
    private void recetap(int etap){
        String recetap = "update setup set etap = ? where nomerzakupki =" + zakupka + " AND lot = 1";
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement =  connection.prepareStatement(recetap);
            preparedStatement.setInt(1,etap);
            preparedStatement.execute();
            //connection.close();
        } catch (SQLException e) {
            System.err.println("Не удлаось подключиться к драйверу базы данных");
        }
  System.out.println("Записал этап");
    }

    private void udalilOk(){

        long startdelte = System.currentTimeMillis();
       while (!(gdemNotelement(By.id("FileListRNEx:SignItemDisabled:1")))) // ждем когда исчезнет елемент
       {
         // System.out.println("удаляеться ... ") ;
           /*if (System.currentTimeMillis() - startdelte > 15000)
           {
               //break
           }*/
       }

      // element = wait.until(presenceOfElementLocated(By.id("SubmitBtn")));
       while (!gdemelement(By.cssSelector("span.x8")))
       {
           System.out.println("Жду когда появитья.... ");
       }
        System.out.println("Элемент удалился через " + (System.currentTimeMillis() - startdelte)/1000 +" сек");

    }
    private void pokazatskorostPodachi()
    {
        double vremaPodchi = (System.currentTimeMillis() - nachalotesta)/1000;
        if (sredneePodachi == 0) sredneePodachi =  vremaPodchi;
        else sredneePodachi = (sredneePodachi + vremaPodchi)/2;
        if (minPodachi > vremaPodchi) minPodachi = vremaPodchi;
        if (maxPodachi < vremaPodchi) maxPodachi = vremaPodchi;
        System.out.println("Время подачи заявки =  " + vremaPodchi);
        System.out.println("Среднее =  " + sredneePodachi);
        System.out.println("минимальное =  " + minPodachi);
        System.out.println("макисмальное =  " + maxPodachi);
        System.out.println("Тест повторился = " + iPovtor);
        nachalotesta = System.currentTimeMillis();
    }
    private void pokazatskorosUdaleniya()
    {
        double vremaUdalenia = (System.currentTimeMillis() - nachalotesta)/1000;
        if (sredneeUdalenia == 0) sredneeUdalenia =  (vremaUdalenia);
        else sredneeUdalenia = ((sredneeUdalenia + (vremaUdalenia))/2);
        if (minUdalenia > vremaUdalenia) minUdalenia = vremaUdalenia;
        if (maxUdalenia < vremaUdalenia) maxUdalenia = vremaUdalenia;
        System.out.println("Время удаления заявки =  " + (vremaUdalenia));
        System.out.println("Среднее =  " + sredneeUdalenia);
        System.out.println("минимальное =  " + minUdalenia);
        System.out.println("макисмальное =  " + maxUdalenia);
        Date d = new Date();
        SimpleDateFormat d1= new SimpleDateFormat(" HH:mm:ss ");
        System.out.println("Текущее время: " + d1.format(d));
        System.out.println("Тест длиться:  "+ (((System.currentTimeMillis() - nachalovsegotesta)/1000)/60 ));
        nachalotesta = System.currentTimeMillis();

    }
   /* private void podpislosOk() throws Exception
    {

        long startgdem = System.currentTimeMillis();
        while (!gdemelement(By.id("FileListRNEx:SignItemDisabled:"+(nomercenovogo)))) // ищет иконку котороя станет не активной если ценовое подписалось
        {
            if((System.currentTimeMillis() - startgdem) > 4000)// время ожидания элемента поле которого перегруз
            {
                podatCenovoe();
                SikuliModalWidow();
                SikuliJavaPwd();
                proverkaPustoyaJava();
                SikuliPodpisatButton();
                SikuliJavaPwd2();
            }
        }
       // element = wait.until(presenceOfElementLocated(By.id("FileListRNEx:SignItemDisabled:1")));//подождать пока иконка подвисать станет неактивной
    }*/
    private void auth () throws Exception
    {
        if (nomerpodayshego == 1) recetap(0);
        driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        element = wait.until(presenceOfElementLocated(By.id("passwordField")));
        element.sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        if  (nomerpodayshego == 1) gdemstart();
        else if (nomerpodayshego == 2){
            gdempervogo();
            gdemizmeneniyaceni();
        }

        element = wait.until(presenceOfElementLocated(By.xpath("//a[contains(text(),'"+nomerZayavki+"')]")));
        baseUrl = driver.getCurrentUrl();
        nachalotesta = System.currentTimeMillis();
        element.click();
        System.out.println("Нажал зайти в заявку");
        element = wait.until(presenceOfElementLocated(By.linkText("Строки")));
        element.click();
        if  (nomerpodayshego == 1) recetap(2);

    }
    private void nagatSozatcenovoe()
    {
        driver.findElement(By.xpath("//table[@id='PageButtons']/tbody/tr/td[10]/button")).click(); //создать ценовое
        System.out.println("Нажал создать ценовое");
    }
    private void podpisatCenovoe()
    {
       // System.out.println("System.out.println(\"//a[@id='FileListRNEx:SignItem:" + (nomercenovogo-1) + "']/img\");");

        element = wait.until(presenceOfElementLocated(By.xpath("//a[@id='FileListRNEx:SignItem:" + (nomercenovogo) + "']/img")));
        element.click();// подписать
        System.out.println("Нажал пиктограмку подписать");




    }

   /* private void zapolnitLoti()
    {
     double ponizitNa = 4.5; //процент на который понизиться заявка от 1 до 5
     //убрать
     Random myRandom = new Random();
     int n = myRandom.nextInt(40);
     ponizitNa = (new Double(n+10))/10;
     //убрать
     zapolnitLot(1, ponizitNa);
     //zapolnitLot(2,  ponizitNa);
    }*/
   private int cenapomenyalas(){
       recperem();
       int variant = 0;
       for (int i = 0; i <lot.length; i++)
       {
           if (staryacenalota[i] != cenalota[i])
           {
               System.out.println("Цена лота * 0.99 =   " + (cenalota[i]*0.99)+ " моя цена которую подаю  = " +
                       ((staryacenalota[i] * (1 - (procent[i] / 100)))/(1-(skidka[i]/100))));
            if ((cenalota[i]*0.99) > (staryacenalota[i] * (1 - (procent[i] / 100))))
            {
               /* System.out.println("Вариант 1 - Цена лота * 0.99 =   " + (cenalota[i]*0.99)+ " моя цена которую подаю  = " +
                        ((staryacenalota[i] * (1 - (procent[i] / 100)))/(1-(skidka[i]/100)))+
                          " цена снизиилась но моя еще ниже");*/
                variant = 1; // цена снизилась но моя еще ниже можно дальше подавать
            }
            else
            {
                System.out.println("Цена лота поменялась Вариант 2");
                return 2;
            }
           }
       }

        return variant;
    }
   private void zapolnitLoti()
   {


       ProverkaZashelvZapolnenie();
      recperem();
     // do
      //{
       System.out.println("Переменные записанны");
       for (int i =0;i<lot.length;i++)
       {
           System.out.println("Заполняю лоты");
           zapolnitLot(lot[i],i);
       }
      //}while (cenapomenyalas() != 0);

   }
    private void zapolnitLot(int lot, int ilot)
    {
        // заполняет поля
       /* String myrez0 = driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr["+(1+lot)+"]/td[4]/span")).getText();
        String str0 = "";
        int i = 0;
        for (i = 0; myrez0.charAt(i) != '.'; i++) {
            if (myrez0.charAt(i) != ',') {
                str0 += myrez0.charAt(i);
            }
        }
        Double dbl0 = new Double(str0);
        int int0 = (int) (dbl0 * (1 - (ponizitNa/100)));*/

           // System.out.println("Цена поменялась");                 //span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[6]/input
            element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[" + (1 + lot) + "]/td[6]/input")));
           // element.click();
           // element.sendKeys(Keys.CONTROL + "a");
            char keyCode = '\u0001'; // ctr + a
            //element.sendKeys  (Keys.CONTROL, "a");
            element.sendKeys(""+ keyCode);
           // long mycena = (long) (cenalota[ilot] * (1 - (procent[ilot] / 100)));
            long mycena = (long) ((cenalota[ilot] * (1 - (procent[ilot] / 100)))/(1-(skidka[ilot]/100)));

            /* Random myRandom = new Random();
             int n = myRandom.nextInt(40);
             mycena += n;*/

            element.sendKeys("" + mycena);
            element.sendKeys(Keys.TAB);

            element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[" + (1 + lot) + "]/td[9]/span")));
            String kolichStr = element.getText();// количесво 1
            int kolichestvo = Integer.parseInt(kolichStr);
            int povtor = 0;
            long cenaStr = 0;
            do {
                do {
                    cenaStr = ProchitatCeny(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[" + (1 + lot) + "]/td[10]/span"));//общая цена
                } while (cenaStr == 0);
                //"Строка2   "
                System.out.println("Моя цена для лота" + lot + "  " + mycena);
                System.out.println("Повтор лота" + lot + "  " + povtor);
                System.out.println("Количество лота" + lot + "  " + kolichestvo);
                System.out.println("Процент понижения   " + procent[ilot]);
                System.out.println("Коэфицент умножения   " + (1 - (procent[ilot] / 100)));
                povtor++;
                cenaStr = cenaStr / kolichestvo;
            }
            while (mycena != cenaStr);
           // System.out.println("Цена поменялась возвращает = "+cenapomenyalas());
    }

    /*private void zapolnitLot(int lot, double ponizitNa)
    {
        // заполняет поля
        String myrez0 = driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr["+(1+lot)+"]/td[4]/span")).getText();
        String str0 = "";
        int i = 0;
        for (i = 0; myrez0.charAt(i) != '.'; i++) {
            if (myrez0.charAt(i) != ',') {
                str0 += myrez0.charAt(i);
            }
        }
        Double dbl0 = new Double(str0);
        int int0 = (int) (dbl0 * (1 - (ponizitNa/100)));
        element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr["+(1+lot)+"]/td[5]/input")));
        element.click();
        element.sendKeys(Keys.CONTROL + "a");
        element.sendKeys("" + int0);
        element.sendKeys(Keys.TAB);
        element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr["+(1+lot)+"]/td[7]/span")));
        str0 = element.getText();// количесво 1
        int kolichestvo = Integer.parseInt(str0);
        int povtor = 0;
        int cenaStr = 0;
        do {
            do {
                cenaStr = ProchitatCeny(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr["+(1+lot)+"]/td[8]/span"));//общая цена
            } while (cenaStr == 0);
            //"Строка2   "
            System.out.println("Строка лота" + lot + "  " + str0);
            System.out.println("Повтор лота"+ lot + "  "  + povtor);
            System.out.println("Количество лота"+ lot + "  "   + kolichestvo);
            System.out.println("Процент понижения   " + ponizitNa);
            System.out.println("Коэфицент умножения   " +  (1 - (ponizitNa/100)));
            povtor++;
            cenaStr = cenaStr/kolichestvo;
        }
        while (int0 != cenaStr);
    }*/

    private void nagatprodolgit ()
    {
                element = wait.until(presenceOfElementLocated(By.xpath("//div[6]/div/table/tbody/tr/td[2]/table/tbody/tr/td[10]/button")));
                element.click();//нажать продолжит
                System.out.println("Нажал продолжить");
                //System.out.println("Кнопка продолжить есть или нет    " + isElementPresent(By.cssSelector("#BidAttributesTable > table.x1h > tbody > tr > th.x1r")));
                long startgdem = System.currentTimeMillis();
                while (!gdemelement(By.cssSelector("#BidAttributesTable > table.x1h > tbody > tr > th.x1r"))) // ищет создать ценовое
                {

                    System.out.println("Ищу создать ценовое    ");
                    if ((System.currentTimeMillis() - startgdem) > 8000)// время ожидания элемента поле которого перегруз
                    {
                        System.out.println("зависло не появилоась не ошибка не кнопка   ");
                        //здесь код если зависло в этом метсе не появилоась не ошибка не кнопка
                        //ProverkaZashelvZapolnenie();
                        zapolnitLoti();
                        element = wait.until(presenceOfElementLocated(By.xpath("//div[6]/div/table/tbody/tr/td[2]/table/tbody/tr/td[10]/button")));
                        element.click();
                    }

                    if (gdemelement(By.cssSelector("h1.x5r"))) {
                        System.out.println("Вылезла ошибка на странице");
                        //ProverkaZashelvZapolnenie();

                        zapolnitLoti();
                        element = wait.until(presenceOfElementLocated(By.xpath("//div[6]/div/table/tbody/tr/td[2]/table/tbody/tr/td[10]/button")));
                        element.click();
                    }
                }



    }
    private void SikuliJavaPwd() throws Exception {
       okwindow.setRect(618, 433, 271, 82);
        okwindow.wait(inputPass, 20000);
        //okwindow.paste(inputPass, "123456");
        okwindow.paste("123456");
        okwindow.click(ok3);
    }
    private  void nagatudalit()
    {
        element = wait.until(presenceOfElementLocated(By.xpath("//a[@id='FileListRNEx:DeleteItem:" + (nomercenovogo) + "']/img")));
        element.click();// нажать корзинку т.е. нажать удалить
    }
    private void ProverkaZashelvZapolnenie()//проверка
    {
        long startgdem = System.currentTimeMillis();

        while (!gdemelement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[4]/span"))) // ищет поле с ценой
        {

            System.out.println("Ждем элемент = " + gdemelement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[4]/span")) );
            if (((System.currentTimeMillis() - startgdem)> 9000) || (gdemelement(By.cssSelector("h1.x5r")) )) // время ожидания элемента поле которого перегруз
            {
                zaitivzayavku();
                nagatstroki();
            }

        }
        System.out.println("Ждем элемент закончился");
    }
    private boolean isElementPresent(By by) {
        try {

            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
        catch (UnhandledAlertException e)
        {
            return false;
        }   }
    private boolean gdemelement(By by)
    {
         try {
             driver.findElement(by);

             return true;
         } catch (NoSuchElementException e) {
             return false;
         } catch (UnhandledAlertException e) {
             return false;
         } catch (StaleElementReferenceException e) {
             return false;
         } catch (ElementNotVisibleException e) {
             return false;
         }


    }
    private boolean gdemNotelement(By by)
    {
            try {
                driver.findElement(by);
                return false;
            } catch (NoSuchElementException e) {
                return true;
            } catch (UnhandledAlertException e) {
                return true;
            } catch (StaleElementReferenceException e) {
                return true;
            } catch (ElementNotVisibleException e) {
                return true;
            }

    }

    private long ProchitatCeny(By by)
    {
        try
        {
            String str = driver.findElement(by).getText();
            long rezult = 0;
           // System.out.println("Буду преобразовывать строку в чилсо ");
            rezult = Integer.parseInt(str);
            //System.out.println("Преобразовал строку в чилсо ");
            return rezult;
        }

        catch (StaleElementReferenceException e)
        {
            return 0;
        }
        catch (NumberFormatException e)
        {
            return 0;
        }
        catch (NoSuchElementException e)
        {
            return 0;
        }
        catch (ElementNotVisibleException e)
        {
            return 0;
        }
        catch (UnhandledAlertException e) {
            return 0;
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
    private void zaitivzayavku()
    {
        driver.get(baseUrl);
        element = wait.until(presenceOfElementLocated(By.xpath("//a[contains(text(),'"+nomerZayavki+"')]")));
        baseUrl = driver.getCurrentUrl();
        element.click();
    }
    private void  nagatstroki()
    {
        element = wait.until(presenceOfElementLocated(By.linkText("Строки")));
        element.click();
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
    private void SikuliModalWidow() throws Exception {
        okwindow.setRect(754, 485, 115, 73);
        okwindow.wait(ok2, 10000);
        okwindow.click(ok2);

    }
    private void proverkaNaitiPodpisat() throws Exception {
        long nachalo = System.currentTimeMillis();
        boolean nashelpodpisat = true;
        int povtor = 1;
        do{


           // okwindow.setRect(146, 589, 76, 23); // на тренеровках
            okwindow.setRect(60,585,220,152);  // в тендере
            try {
                okwindow.wait(gotovpodpisat, 4);
                nashelpodpisat = true;
            }
            catch (FindFailed e)
            {
                nashelpodpisat = false;
            }

            System.out.println("Нашел подписать = " + nashelpodpisat);
            System.out.println("long nachalo ="+nachalo);
            System.out.println("milis - long nachalo =" + (System.currentTimeMillis() - nachalo));
            if ((System.currentTimeMillis() - nachalo) > 15000)
            {
                podpisatCenovoe();
                ispravitGluk();
                SikuliModalWidow();
                SikuliJavaPwd();
                nachalo = System.currentTimeMillis();
                // okwindow.setRect(146, 589, 76, 23); // на тренеровках
                okwindow.setRect(129,642,72,23);  // в тендере

                try {
                    okwindow.wait(gotovpodpisat, 2);
                    nashelpodpisat = true;
                }
                catch (FindFailed e)
                {
                    nashelpodpisat = false;
                }

            }

        }
        while (!nashelpodpisat);
        System.out.println("Проверка нашел подписать ОК ");
    }
    private void ispravitGluk() throws Exception{
        okwindow.setRect(196, 345, 88, 36);
        okwindow.click(postavshik);
    }
    /*private void proverkaGotovPodpisat() throws Exception{
        long nachalo = System.currentTimeMillis();
        boolean pustijavabool = true;
        int povtor = 1;
        do{
            okwindow.setRect(146, 589, 76, 23);
            //pustijavabool = !(okwindow.exists(gotovpodpisat,1) == null);
            try {
                okwindow.wait(gotovpodpisat,2);
                pustijavabool = false;
            }
            catch (FindFailed e)
            {
                pustijavabool = true;
            }
            // Thread.sleep(70);
            System.out.println("Готов подписать  = " + pustijavabool);
            System.out.println("long nachalo ="+nachalo);
            System.out.println("milis - long nachalo =" + (System.currentTimeMillis() - nachalo));
            if ((System.currentTimeMillis() - nachalo) > 3000)
            {

                podatCenovoe();
                System.out.println("Нажал подать ценовое из за не нашлось кнопки отправить");
                ispravitGluk();
                SikuliModalWidow();
                //окно джава просит пароль
                SikuliJavaPwd();
                nachalo = System.currentTimeMillis();
                proverkaNaitiPodpisat();
                System.out.println("Проверка нашел подписать ОК ");
                nachalo = System.currentTimeMillis();
                okwindow.setRect(146, 589, 76, 23);
                try {
                    okwindow.wait(gotovpodpisat, 2);
                    pustijavabool = false;
                }
                catch (FindFailed e)
                {
                    pustijavabool = true;
                }

            }

        }
        while (pustijavabool);
    }*/
    private void SikuliPodpisatButton() throws Exception{
        // okwindow.setRect(146, 589, 76, 23); // на тренеровках
       // убрал okwindow.setRect(129,642,72,23);  // в тендере
       // убрал okwindow.wait(gotovpodpisat, 10000);
        // убрал okwindow.setRect(123, 628, 90, 32);
        okwindow.setRect(123, 599, 95, 36);
        okwindow.wait(podpisat, 20000); //добавил
        okwindow.click(podpisat);
        okwindow.setRect(597, 433, 245, 54);
        okwindow.wait(input2, 10000);
    }
    private void SikuliJavaPwd2() throws Exception{
        boolean NeviguPWD = true;

        do {
            //кликает в поле
            okwindow.setRect(597, 433, 245, 54);
            boolean neclichul = true;
            do {

                try {
                    okwindow.click(input2);
                    neclichul= false;
                } catch (FindFailed e) {
                    neclichul = true;
                }
            }while (neclichul);
            //кликает в поле

            okwindow.type("a", KeyModifier.CTRL);
            okwindow.paste("123456");


            try {
                // okwindow.find(pwdOk);
                okwindow.setRect(729, 438, 80, 14);
                System.out.println("Ищу пароль");
                //okwindow.cl
                okwindow.wait(pwdOk,2);
                NeviguPWD = false;
                System.out.println("Нашел пароль");
            } catch (FindFailed e) {
                NeviguPWD = true;
                System.out.println("НЕ наашел пароль");
            }
        }while (NeviguPWD);
        okwindow.setRect(645, 459, 29, 26);
        okwindow.click(ok4);
    }
    private void SikuliJavaOtpravitButton() throws Exception{
       /* okwindow.setRect(31, 625, 97, 40);
        okwindow.wait(gotovotpravit, 10000);
        okwindow.setRect(217, 625, 84, 38);
        okwindow.click(otpravit);
        System.out.println("Нажал отправить на сервер заявку");*/
        long startgdem = System.currentTimeMillis();
        while (!gdemelement(By.id("FileListRNEx:SignItemDisabled:"+(nomercenovogo))))
        {

            if((System.currentTimeMillis() - startgdem) > 9000)// время ожидания элемента поле которого перегруз
            {
                System.out.println("Подаюсь за ново из за ошибки неотправилось на сервер");
                podpisatCenovoe();
                SikuliModalWidow();
               // SikuliJavaPwd();
                proverkaNaitiPodpisat();
                SikuliPodpisatButton();
                SikuliJavaPwd2();
               /* okwindow.setRect(31, 625, 97, 40);
                okwindow.wait(gotovotpravit, 10000);
                okwindow.setRect(217, 625, 84, 38);
                okwindow.click(otpravit);*/
            }
        }  // ищет иконку котороя станет не активной если ценовое подписалось
        // while (gdemNotelement(By.xpath("//a[@id='FileListRNEx:SignItem:" + (nomercenovogo) + "']/img")));
        //By.xpath("//a[@id='FileListRNEx:SignItem:" + (nomercenovogo) + "']/img")
        /*okwindow.setRect(31, 625, 97, 40);
        okwindow.wait(gotovotpravit, 10000);*/
    }
    private void udalizayavku() throws Exception{
        nagatudalit();
        okwindow.setRect(749, 479, 100, 49);
        okwindow.click(ok2);//jjj
        udalilOk();
    }
}
