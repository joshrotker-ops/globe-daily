// Content bank. Edit here; the game code in main.js does not need to change.
export const CITIES=[
["Tokyo","Japan",35.68,139.69,14,1,15,"Japanese"],["Cairo","Egypt",30.04,31.24,10,1,22,"Arabic"],["Lima","Peru",-12.05,-77.04,10.7,1,19,"Spanish"],
["Nairobi","Kenya",-1.29,36.82,4.4,1,18,"Swahili and English"],["Madrid","Spain",40.42,-3.7,3.4,1,15,"Spanish"],["Sydney","Australia",-33.87,151.21,5.3,1,18,"English"],
["Istanbul","Türkiye",41.01,28.98,15.5,1,14,"Turkish"],["Bangkok","Thailand",13.76,100.5,10.5,1,28,"Thai"],["Buenos Aires","Argentina",-34.6,-58.38,3.1,1,18,"Spanish"],
["Lagos","Nigeria",6.52,3.38,15,1,27,"English"],["Mexico City","Mexico",19.43,-99.13,9.2,1,17,"Spanish"],["Moscow","Russia",55.76,37.62,13,1,6,"Russian"],
["Cape Town","South Africa",-33.92,18.42,4.6,2,17,"English and Afrikaans"],["Jakarta","Indonesia",-6.2,106.85,10.6,1,27,"Indonesian"],["Lisbon","Portugal",38.72,-9.14,0.55,1,17,"Portuguese"],
["Reykjavik","Iceland",64.15,-21.94,0.14,1,4,"Icelandic"],["Santiago","Chile",-33.45,-70.67,6.3,1,14,"Spanish"],["Addis Ababa","Ethiopia",9.03,38.74,3.5,1,16,"Amharic"],
["Hanoi","Vietnam",21.03,105.85,8,2,24,"Vietnamese"],["Wellington","New Zealand",-41.29,174.78,0.21,3,13,"English"],["Perth","Australia",-31.95,115.86,2.1,4,18,"English"],
["Dakar","Senegal",14.72,-17.47,1.2,1,24,"French"],["Ulaanbaatar","Mongolia",47.89,106.91,1.6,1,0,"Mongolian"],["Quito","Ecuador",-0.18,-78.47,2,2,14,"Spanish"]];
export const EVENTS=[
["Political","Where was the treaty that divided newly found lands between Spain and Portugal signed?",1494,41.5,-5.0,60,"The Treaty of Tordesillas drew a line west of the Cape Verde islands, and it is why Brazil speaks Portuguese."],
["Economic","Where were the first publicly traded company shares issued by a trading giant, creating the first modern stock market?",1602,52.37,4.9,60,"The Dutch East India Company’s shares traded in Amsterdam, the model for later stock exchanges."],
["Economic","Where did the 1929 market crash that opened the Great Depression begin?",1929,40.71,-74.01,60,"Panic selling on Wall Street wiped out billions in value and spread across the world’s economies."],
["Political","Where was independence declared at midnight, ending British rule over a subcontinent?",1947,28.61,77.21,80,"India’s tryst with destiny speech was delivered in Delhi on 14–15 August."],
["Scientific","Where did the first sustained, powered airplane flight take place?",1903,36.02,-75.67,60,"The Wright brothers flew 12 seconds on the Outer Banks of North Carolina."],
["Disaster","Where was the 1883 volcanic eruption whose sound was heard thousands of kilometres away?",1883,-6.1,105.42,150,"Krakatoa’s eruption caused tsunamis and cooled global temperatures for years."],
["Political","Where did a wall that had split a city for 28 years open in 1989?",1989,52.52,13.4,60,"The fall of the Berlin Wall led to German reunification the next year."],
["Social","Where did the 1930 salt march against a colonial tax begin?",1930,23.06,72.58,120,"Gandhi set out from Sabarmati Ashram, near Ahmedabad, on a 240-mile walk to the sea."],
["Economic","Where did a gold discovery in 1848 trigger a mass migration?",1848,38.8,-120.9,150,"Gold at Sutter’s Mill in California started the Gold Rush."],
["Economic","Where did a canal linking two seas open in 1869, reshaping world trade?",1869,30.5,32.3,200,"The Suez Canal cut the sea route from Europe to Asia by thousands of kilometres."],
["Disaster","Where did the 1986 nuclear reactor accident occur?",1986,51.39,30.1,120,"Chernobyl, then in the Soviet Union, is today in northern Ukraine."]];

// [language, sentence, translation, [countries where it is spoken], [optional partial-credit countries]]
// Country names must match the world-atlas names (run npm run validate).
export const SENT=[
["Swahili","Habari za asubuhi, rafiki yangu.","Good morning, my friend.",["Kenya","Tanzania","Uganda","Dem. Rep. Congo"]],
["Portuguese","Eu gosto muito de café com leite.","I really like coffee with milk.",["Brazil","Portugal","Angola","Mozambique"]],
["Spanish","¿Dónde está la estación de tren?","Where is the train station?",["Spain","Mexico","Argentina","Colombia","Peru","Venezuela","Chile","Cuba","Ecuador","Bolivia"]],
["Hindi","आप कैसे हैं?","How are you?",["India"]],
["Arabic","أين المكتبة؟","Where is the library?",["Egypt","Saudi Arabia","Morocco","Iraq","Algeria","Jordan","Libya","Tunisia","Yemen","Syria","Lebanon","United Arab Emirates","Sudan"]],
["French","Où est la boulangerie ?","Where is the bakery?",["France","Senegal","Côte d'Ivoire","Dem. Rep. Congo","Madagascar","Mali","Cameroon","Haiti"]],
["Turkish","Bugün hava çok güzel.","The weather is lovely today.",["Turkey"]],
["Indonesian","Saya mau makan nasi goreng.","I want to eat fried rice.",["Indonesia"]]];
