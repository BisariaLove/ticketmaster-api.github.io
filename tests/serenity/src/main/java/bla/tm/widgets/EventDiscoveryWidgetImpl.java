package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class EventDiscoveryWidgetImpl extends AnsestorWidgetImpl implements EventDiscoveryWidget{

    //WebElements
    @FindBy(xpath = "//span[contains(@class,'event-name')]")
    private WebElementFacade posterWindowText;

    @FindBy(xpath = "//div[@class='events-counter']")
    private WebElementFacade posterEventsCounter;

    private String countryDropdownXPath = "//select[@id='w-country']";

    /**
     * Constructor for initializing elements on the page
     * @param page
     * @param locator
     * @param webElement
     * @param timeoutInMilliseconds
     */
    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                                    final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator,
                                    final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public void setPeriodValue(String period) {

    }

    @Override
    public void setRadiusValue(String radius) {
        radiusField.clear();
        radiusField.sendKeys(radius, Keys.ENTER);
    }

    @Override
    public String getRadiusValue() {
        return radiusField.getValue();
    }

    @Override
    public void setSourceValue(String source) {
        String arrowXpath = "//label[@for='w-source']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-source']/following-sibling::div/ul/li[contains(@data-value,'%s')]", source);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public void setCountryCodeValue(String countryCode) {
        String arrowXpath = "//label[@for='w-countryCode']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-countryCode']/following-sibling::div/ul/li[text()='%s']", countryCode);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public String getPosterText() {
        return posterWindowText.getText();
    }

    @Override
    public String getPosterEventsCount() {
        Pattern pattern = Pattern.compile("(\\d+)\\sevent");
        Matcher matcher = pattern.matcher(posterEventsCounter.getText());
        String countNumber = null;
        while (matcher.find()) {
            countNumber = matcher.group(1);
        }
        return countNumber;
    }

    @Override
    public String getSelectedCountry() {
        waitForSomeActionHappened(1500);
        return getCountryWebElementFacade().getSelectedVisibleTextValue();
    }

    //Private Methods
    private WebElementFacade getCountryWebElementFacade(){
        return getPage().element(By.xpath(countryDropdownXPath));
    }
 }
