import re
html = open('scratch_sheet.html', encoding='utf-8').read()
tabs = re.findall(r'<li id="sheet-button-[^"]*"><a[^>]*>([^<]+)</a>', html)
print("EXTRACTED TABS:", tabs)
if not tabs:
    # try alternate regex
    tabs = re.findall(r'class="[a-zA-Z0-9_-]*sheet-name[^"]*">([^<]+)<', html)
    print("ALT TABS:", tabs)
    # search for 'Campaigns_Data' or 'Sheet1'
    print("Contains Campaigns_Data:", "Campaigns_Data" in html)
    print("Contains Sheet1:", "Sheet1" in html)
    print("Contains Ad_Launch_Queue:", "Ad_Launch_Queue" in html)
