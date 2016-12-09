package IE8;

/**
 * Created by Administrator on 06.12.2016.
 */
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
import java.util.Date;
import java.text.SimpleDateFormat;;
import java.util.Random;

public class NavigatorHelper  {
    private WebDriver driver;
    private String baseUrl;
    private WebDriverWait wait;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private WebElement element;
    private long nachalotesta;
    private double sredneePodachi;
    private double sredneeUdalenia;
    private double minPodachi;
    private double maxPodachi;
    private double minUdalenia;
    private double maxUdalenia;
    private int nomercenovogo;
    private String nomerZayavki;
    /*nomerZayavki = "1106614"; //номер заявки в которой учавствует
    nomercenovogo = 2; //каким номером по счету будет в ценовое предложене в общем списке с пркикрипленными файлами.
    driver = new InternetExplorerDriver();
    wait = new WebDriverWait(driver, 30000);
    sredneePodachi = 0;
    sredneeUdalenia =0;
    minPodachi = 100;
    maxPodachi = 0;
    minUdalenia = 100;
    maxPodachi = 0;*/

    public void auth()
    {
        driver = new InternetExplorerDriver();
        wait = new WebDriverWait(driver, 30000);
        driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        element = wait.until(presenceOfElementLocated(By.id("passwordField")));
        element.sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        element = wait.until(presenceOfElementLocated(By.xpath("//a[contains(text(),'"+nomerZayavki+"')]")));
        baseUrl = driver.getCurrentUrl();
        nachalotesta = System.currentTimeMillis();
        element.click();
        element = wait.until(presenceOfElementLocated(By.linkText("Строки")));
        element.click();
    }



}
