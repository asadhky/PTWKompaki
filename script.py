from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Selenium WebDriver (make sure ChromeDriver is installed)
driver = webdriver.Chrome()

# Load the webpage
driver.get("http://18.207.217.188:5000/code")

try:
    # Wait for the CodeMirror editor to be fully loaded
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'CodeMirror'))
    )
    
    # Use JavaScript to get the content from CodeMirror
    gcode_content = driver.execute_script("return codeEditor.getValue();")
    
    # Check if content was extracted
    if gcode_content.strip():
        print("Extracted G-code Content:")
        print(gcode_content)
    else:
        print("No content found in the CodeMirror editor.")
    
except Exception as e:
    print(f"An error occurred: {e}")

# Close the browser
driver.quit()
