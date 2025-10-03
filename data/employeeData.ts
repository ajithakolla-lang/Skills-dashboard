
import type { Employee } from '../types';

// Raw Data Strings
const MASTER_SHEET_DATA = `
name, email, job title, location, Reporting Manager, Project
Hitasha Chugh,hitasha.chugh@globallogic.com,Lead Analyst,Santa Clara,Naveen Bhalla,DISA Modernization
Elena Gordiyenko,elena.gordiyenko2@globallogic.com,Senior Analyst,Santa Clara,Kamalpreet Kaur,Medtronic
Rahil Sareen,rahil.sareen@globallogic.com,Senior Product Manager,Toronto,Ajitha Kolla,Convera Engineering
Olga Manzhai,olga.manzhai2@globallogic.com,Lead Product Manager,Santa Clara,Naveen Bhalla,USA Transition
Stefanus Suswanto,stefanus.suswanto@globallogic.com,Senior Staff Product Manager,Toronto,Ajitha Kolla,Synthetic Group LLC
Nagarajan Iyer,nagarajan.iyer@globallogic.com,Senior Product Manager,Toronto,Ramit Kasturia,Convera Engineering
Praveen Kollepara,praveen.kollepara@globallogic.com,Senior Staff Product Manager,Santa Clara,Vishal Marwah,Verizon
Komala Doreraj,komala.doreraj@globallogic.com,Associate Manager,Santa Clara,Naveen Bhalla,Verizon
Shital Sharma,shital.sharma@globallogic.com,Senior Product Manager,Toronto,Rashmi Shrivastava,Advantage 
Angelah Lincy Charles Regina,angelah.charles@globallogic.com,Lead Product Manager,Toronto,Rashmi Shrivastava,Advantage 
Namit Dhingra,namit.dhingra2@globallogic.com,Lead Product Manager,Toronto,Priyanka Chaturvedi,Convera Engineering
Jolly Sharma,Jolly.Sharma@globallogic.com,Senior Manager,Santa Clara,Rashmi Shrivastava,Penske
Ninad Lokhande,ninad.lokhande@globallogic.com,Lead Analyst,Santa Clara,Rashmi Shrivastava,Dollar General
Raghavendra EMS,raghavendra.ems@globallogic.com,Specialist Analyst,Santa Clara,Kamalpreet Kaur,Credit One
Sanjana Kapoor,sanjana.kapoor@globallogic.com,Lead Analyst,Bellevue,Rashmi Shrivastava,USA Transition
Vladyslava Polivtseva,v.polivtseva@globallogic.com,Senior Staff Product Manager,Santa Clara,Rashmi Shrivastava,Fortrea
Vasanth Mammula,vasanth.mammula@globallogic.com,Lead Analyst,Santa Clara,Priyanka Chaturvedi,T-Mobile
Bhaskar Gandi,bhaskar.g.gandi@globallogic.com,Staff Product Manager,Santa Clara,Rashmi Shrivastava,DISA Modernization
Alla Rapp,alla.rapp@globallogic.com,Senior Analyst,Toronto,Geetesh Garg,T-Mobile
Kaushik Kandaswamy,kaushik.kandaswamy@globallogic.com,Senior Consultant,Santa Clara,Ramit Kasturia,Jack Henry & Associates
Lesia Hlynka,lesia.hlynka@globallogic.com,Senior Analyst,Santa Clara,Kamalpreet Kaur,Medtronic
Geetesh Garg,geetesh.garg@globallogic.com,Associate Manager,Santa Clara,Ramit Kasturia,Guidewire Software
Oleksandr Malinovskyi,o.malinovskyi@globallogic.com,Staff Product Manager,Santa Clara,Rashmi Shrivastava,Cengage Learning
Vishu Vashishth,vishu.vashishth@globallogic.com,Lead Analyst,Santa Clara,Naveen Bhalla,Credit One
Serhii Naumov,serhii.naumov@globallogic.com,Lead Analyst,Santa Clara,Priyanka Chaturvedi,JLL
Halyna Trishch,halyna.m.trishch@globallogic.com,Senior Analyst,Santa Clara,Kamalpreet Kaur,Medtronic
Sapna Yadav,sapna.yadav@globallogic.com,Implementation Manager,Santa Clara,Rohit Nakra,USA Transition
Abisoye Durodola,abisoye.durodola@globallogic.com,Lead Product Manager,Toronto,Ajitha Kolla,USA Transition
Puneet Gupta,puneet.gupta5@globallogic.com,Staff Product Manager,Toronto,Ramit Kasturia,USA Transition
Rafael Monsalvo,rafael.monsalvo@globallogic.com,Lead Product Manager,Toronto,Ramit Kasturia,USA Transition
Omar Azzah,omar.azzah@globallogic.com,Lead Analyst,Santa Clara,Rashmi Shrivastava,Google
Nataliia Lytvynenko,n.v.lytvynenko@globallogic.com,Senior Analyst,Santa Clara,Geetesh Garg,Disney
Ihor Kucheruk,ihor.kucheruk@globallogic.com,Senior Analyst,Santa Clara,Naveen Bhalla,Hitachi Global Air
Kartik Arora,kartik.arora@globallogic.com,Specialist Analyst,Santa Clara,Ramit Kasturia,Jack Henry & Associates
Saharsh Taneja,saharsh.taneja@globallogic.com,Lead Analyst,Santa Clara,Priyanka Chaturvedi,WBA
Austin Kim,austin.y.kim@globallogic.com,Lead Product Manager,Santa Clara,Vishal Marwah,Verizon
Haw Shiuan Chan,haw.chan@globallogic.com,Analyst,Santa Clara,Rashmi Shrivastava,Google
Tuba Meric,tuba.meric@globallogic.com,Lead Product Manager,Santa Clara,Vishu Vashishth,USA Transition
Rajesh Paudel,rajesh.paudel@globallogic.com,Senior Analyst,Santa Clara,Priyanka Chaturvedi,Jack Henry & Associates
Maitreyi Ramesh Swaroop,maitreyi.swaroop@globallogic.com,Lead Analyst,Santa Clara,Vishal Marwah,Verizon
Rashmi Shrivastava,rashmi.shrivastava@globallogic.com,Director,Santa Clara,Rohit Nakra,Dollar General
Alisa Geer,alisa.geer@globallogic.com,Associate Product Manager,Santa Clara,Vishal Marwah,Verizon
Naveen Bhalla,NAVEEN.BHALLA@GLOBALLOGIC.COM,Manager,Santa Clara,Ramit Kasturia,Benevity
Ajitha Kolla,ajitha.kolla@globallogic.com,Senior Manager,Santa Clara,Rashmi Shrivastava,WBA
Kamalpreet Kaur,kamalpreet.kaur@globallogic.com,Senior Product Manager,Santa Clara,Ramit Kasturia,Vestcom
Vishal Marwah,vishal.marwah@globallogic.com,Director,Toronto,Rohit Nakra,Expedia
Ramit Kasturia,ramit.kasturia@globallogic.com,Director,Santa Clara,Rohit Nakra,DISA Modernization
Farida Khan,farida.khan2@globallogic.com,Senior Specialist,Toronto,Vishal Marwah,WBA
Volodymyr Novak,volodymyr.novak@globallogic.com,Lead Product Manager,Toronto,Geetesh Garg,WBA
Vijul kakkar,vijul.kakkar@globallogic.com,Software Engineer,Toronto,Sapna Yadav,USA Transition
Vijayaraja Xavier,vijayaraja.xavier@globallogic.com,Lead Analyst,Santa Clara,Kamalpreet Kaur,Medtronic
Sandeep Choudhary,sandeep.choudhary@globallogic.com,Senior Product Manager,Santa Clara,Naveen Bhalla,BSC NA
Vibhu Shekhar,vibhu.shekhar@globallogic.com,,,,,
Vijay Sourab Singh Seetaram Mahadev,vijay.s.mahadev@globallogic.com,,,,,
`;

const EXPERTISE_A_DATA = `
Domain,Expert,Intermediate
Automotive,"Angelah Lincy Charles Regina, Ninad Lokhande, Puneet Gupta, Sanjana Kapoor, Ajitha Kolla, Rafael Monsalvo, Pranita Bargale","Ajitha Kolla, Ninad Lokhande, Pranita Bargale, Sanjana Kapoor, Tuba Meric, Vlady Polivtseva, Karanbir Sidhu, Nagarajan Iyer, Stefanus Suswanto, Rafael Monsalvo, Puneet Gupta, Angelah Lincy Charles Regina"
Communication,"Oleksandr Malinovskyi, Rafael Monsalvo, Sanjana Kapoor, Karanbir Sidhu","Sanjana Kapoor, Serhii Naumov, Farida Khan, Oleksandr Malinovskyi, Pranita Bargale, Karanbir Sidhu, Ramit Kasturia, Vlady Polivtseva, Ninad Lokhande, Balaji Kumar"
Consumer,"Rashmi Shrivastava, Sanjana Kapoor, Rahil Sareen, Bhaskar Goud Gandi, Vishal Marwah, Karanbir Sidhu, Angelah Lincy Charles Regina, Rafael Monsalvo, Raghavendra Ems","Angelah Lincy Charles Regina, Bhaskar Goud Gandi, Karanbir Sidhu, Pranita Bargale, Raghavendra Ems, Rahil Sareen, Ramit Kasturia, Stefanus Suswanto, Ajitha Kolla, Kartik Arora, Rashmi Shrivastava, Shital Sharma, Vasanth Mammula, Nataliia Lytvynenko, Nagarajan Iyer, Vibhu Shekhar, Ninad Lokhande, Serhii Naumov, Vishal Marwah, Sanjana Kapoor, Elena Gordiyenko, Hitasha Chugh, Puneet Gupta, Rafael Monsalvo"
Finance,"Nagarajan Iyer, Rafael Monsalvo, Sanjana Kapoor, Priyanka Chaturvedi, Rahil Sareen, Tuba Meric, Kartik Arora, Shital Sharma, Pranita Bargale, Geetesh Garg","Pranita Bargale, Priyanka Chaturvedi, Puneet Gupta, Rahil Sareen, Sanjana Kapoor, Tuba Meric, Bhaskar Goud Gandi, Kartik Arora, Nataliia Lytvynenko, Nagarajan Iyer, Stefanus Suswanto, Arup Kumar Bhattacharjee, Karanbir Sidhu, Vasanth Mammula, Elena Gordiyenko, Olga Manzhai, Ramit Kasturia, Vibhu Shekhar, Balaji Kumar, Geetesh Garg, Kaushik Kandaswamy, Shital Sharma, Raghavendra Ems, Serhii Naumov, Rashmi Shrivastava"
Healthcare,"Pranita Bargale, Sanjana Kapoor, Tuba Meric, Elena Gordiyenko, Kamalpreet Kaur, Nagarajan Iyer, Farida Khan, Vlady Polivtseva, Rashmi Shrivastava","Farida Khan, Hitasha Chugh, Kamalpreet Kaur, Nagarajan Iyer, Vishal Marwah, Ajitha Kolla, Olga Manzhai, Rafael Monsalvo, Sanjana Kapoor, Rahil Sareen, Vasanth Mammula, Elena Gordiyenko, Ninad Lokhande, Arup Kumar Bhattacharjee, Pranita Bargale, Angelah Lincy Charles Regina, Tuba Meric, Ihor Kucheruk, Volodymyr Novak"
Industrial,Karanbir Sidhu,"Ninad Lokhande, Arup Kumar Bhattacharjee, Karanbir Sidhu, Sanjana Kapoor, Pranita Bargale, Rafael Monsalvo, Angelah Lincy Charles Regina, Stefanus Suswanto, Vasanth Mammula, Tuba Meric"
Media,"Volodymyr Novak, Kamalpreet Kaur, Rashmi Shrivastava, Ramit Kasturia, Vishal Marwah, Sanjana Kapoor","Sanjana Kapoor, Ramit Kasturia, Tuba Meric, Ninad Lokhande, Nataliia Lytvynenko, Pranita Bargale, Raghavendra Ems, Rashmi Shrivastava, Vibhu Shekhar, Elena Gordiyenko, Karanbir Sidhu, Kamalpreet Kaur, Shital Sharma"
Miscellaneous,"Ramit Kasturia, Vishal Marwah, Hitasha Chugh, Sanjana Kapoor, Ajitha Kolla, Raghavendra Ems","Raghavendra Ems, Rashmi Shrivastava, Sanjana Kapoor, Vibhu Shekhar, Ajitha Kolla, Vasanth Mammula, Ninad Lokhande, Serhii Naumov, Shital Sharma, Farida Khan, Pranita Bargale, Puneet Gupta, Tuba Meric, Stefanus Suswanto"
Network,Rafael Monsalvo,"Sanjana Kapoor, Pranita Bargale, Ninad Lokhande, Farida Khan, Oleksandr Malinovskyi, Serhii Naumov"
Technology,"Ajitha Kolla, Balaji Kumar, Bhaskar Goud Gandi, Farida Khan, Kartik Arora, Pranita Bargale, Sanjana Kapoor, Tuba Meric, Volodymyr Novak, Nagarajan Iyer, Kamalpreet Kaur, Stefanus Suswanto, Karanbir Sidhu","Angelah Lincy Charles Regina, Hitasha Chugh, Ihor Kucheruk, Kamalpreet Kaur, Karanbir Sidhu, Nataliia Lytvynenko, Nagarajan Iyer, Ninad Lokhande, Oleksandr Malinovskyi, Priyanka Chaturvedi, Rahil Sareen, Rashmi Shrivastava, Stefanus Suswanto, Vlady Polivtseva, Vasanth Mammula, Vishal Marwah, Pranita Bargale, Sanjana Kapoor, Ajitha Kolla, Bhaskar Goud Gandi, Elena Gordiyenko, Tuba Meric, Shital Sharma, Mayur Jaganiya, Puneet Gupta, Arup Kumar Bhattacharjee, Kartik Arora, Rafael Monsalvo"
`;

const EXPERTISE_B_DATA = `
Domain,Primary Expert
Automotive,Ajitha Kolla
Communication Service Providers,Farida Khan
Consumer,Rashmi Shrivastava
Finance, Geetesh Garg ( Insurance) / Kaushik Kandaswamy ( Banking)
Healthcare,Vlady Polivtseva
Industrial,Arup Bhatacharjee
Media & Entertainment,Volodymyr Novak
Network Providers,Farida Khan
Technology,Ninad Lohande
`;

const CERT_DATA = `
Email Address,Licenses & Certifications
abisoye.durodola@globallogic.com,PSPO
abisoye.durodola@globallogic.com,CSM
abisoye.durodola@globallogic.com,Digital Strategies
ajitha.kolla@globallogic.com,CSM
ajitha.kolla@globallogic.com,SAFe PO/PM
angelah.charles@globallogic.com,ISTQB
angelah.charles@globallogic.com,PSPO
anthony.moreaux@globallogic.com,CSPO
anthony.moreaux@globallogic.com,CSM
arup.bhattacharjee@globallogic.com,CSM
danielle.workman@globallogic.com,CSPO
danielle.workman@globallogic.com,PSPO
danielle.workman@globallogic.com,AI Product Management
elena.gordiyenko2@globallogic.com,ISTQB
elena.gordiyenko2@globallogic.com,PSM
farida.khan2@globallogic.com,PMP
geetesh.garg@globallogic.com,SAFe PO/PM
geetesh.garg@globallogic.com,SAFe Agilist
geetesh.garg@globallogic.com,CSM
halyna.m.trishch@globallogic.com,SAFe Agilist
hitasha.chugh@globallogic.com,SAFe PO/PM
hitasha.chugh@globallogic.com,CSPO
ihor.kucheruk@globallogic.com,CSPO
kamalpreet.kaur@globallogic.com,SAFe PO/PM
kartik.arora@globallogic.com,SAFe PO/PM
kartik.arora@globallogic.com,CSPO
kaushik.kandaswamy@globallogic.com,SAFe PO/PM
kaushik.kandaswamy@globallogic.com,CSPO
mayur.jaganiya@globallogic.com,PMP
nagarajan.iyer@globallogic.com,PSPO
nagarajan.iyer@globallogic.com,SAFe PO/PM
namit.dhingra2@globallogic.com,SAFe PO/PM
namit.dhingra2@globallogic.com,CSM
namit.dhingra2@globallogic.com,CSPO
ninad.lokhande@globallogic.com,SAFe PO/PM
ninad.lokhande@globallogic.com,CSPO
olga.manzhai2@globallogic.com,SAFe PO/PM
olga.manzhai2@globallogic.com,PSPO
olga.manzhai2@globallogic.com,PMP
olga.manzhai2@globallogic.com,CSPO
olga.manzhai2@globallogic.com,SAFe Agilist
pranita.bargale@globallogic.com,SAFe PO/PM
priyanka.chaturvedi@globallogic.com,SAFe PO/PM
priyanka.chaturvedi@globallogic.com,SAFe Agilist
priyanka.chaturvedi@globallogic.com,FIII
priyanka.chaturvedi@globallogic.com,AINS 24
priyanka.chaturvedi@globallogic.com,Data Analytics
priyanka.chaturvedi@globallogic.com,Project Management
puneet.gupta5@globallogic.com,CSPO
rafael.monsalvo@globallogic.com,SAFe PO/PM
rafael.monsalvo@globallogic.com,CSPO
raghavendra.ems@globallogic.com,SAFe PO/PM
raghavendra.ems@globallogic.com,CSPO
rahil.sareen@globallogic.com,SAFe PO/PM
rajdeep.roy@globallogic.com,CSPO
rajdeep.roy@globallogic.com,SAFe PO/PM
rajdeep.roy@globallogic.com,CBAP
rajdeep.roy@globallogic.com,CSM
rajdeep.roy@globallogic.com,SAFe Agilist
ramit.kasturia@globallogic.com,SAFe PO/PM
rashmi.shrivastava@globallogic.com,SAFe PO/PM
rashmi.shrivastava@globallogic.com,CSPO
rashmi.shrivastava@globallogic.com,AI Product Management
saharsh.taneja@globallogic.com,PSPO
saharsh.taneja@globallogic.com,PSM
sandeep.choudhary@globallogic.com,SAFe PO/PM
sanjana.kapoor@globallogic.com,CSPO
sanjana.kapoor@globallogic.com,SAFe PO/PM
serhii.naumov@globallogic.com,SAFe Agilist
shital.sharma@globallogic.com,SAFe PO/PM
shital.sharma@globallogic.com,SAFe Agilist
stefanus.suswanto@globallogic.com,Data Analytics
v.polivtseva@globallogic.com,CSPO
v.polivtseva@globallogic.com,SAFe PO/PM
v.polivtseva@globallogic.com,SAFe Agilist
vasanth.mammula@globallogic.com,Six Sigma
vibhu.shekhar@globallogic.com,SAFe PO/PM
vishal.marwah@globallogic.com,PMI-ACP
vishal.marwah@globallogic.com,CSPO
volodymyr.novak@globallogic.com,SAFe PO/PM
volodymyr.novak@globallogic.com,PSPO
`;

const CLIENT_NAMES_DATA = `
Email Address,Client Names
priyanka.chaturvedi@globallogic.com,"Insurity, Direct Line Group UK, Scottish Life Insurance, Finastra, Nucleus"
ninad.lokhande@globallogic.com,Lytx 
angelah.charles@globallogic.com,"Bombardier, SAP, Siemens"
lizbeth.rodriguez@globallogic.com,"Zeal Group, Banco Popular "
rafael.monsalvo@globallogic.com,"Telus, Loblaws"
vishal.marwah@globallogic.com,"Expedia, Pearson"
elena.gordiyenko2@globallogic.com,Clients NDA
stefanus.suswanto@globallogic.com,Wex
serhii.naumov@globallogic.com,"JLL, Deutsche Bank, Bottomline Technologies, Inc"
alla.rapp@globallogic.com,"SFDC, T-mobile"
vijay.s.mahadev@globallogic.com,Edureka
rashmi.shrivastava@globallogic.com,"Kohls, Zappos, Gamestop, Michael Kors, Dollar General, Belcorp, iCIMS, Mars Petcare,  Pearson Elearning"
ajitha.kolla@globallogic.com,"Ford, Motorola, WBA, Vizio"
lesia.hlynka@globallogic.com,Medtronic
anshul.seth@globallogic.com,"Kayo sports and Binge, Peoplesoft ER"
namit.dhingra2@globallogic.com,Alstrong Composite panel
kamalpreet.kaur@globallogic.com,"Mars Pet Care, Pearson, Vestcom, Iyogi, AON Hewitt, NIIT Technology"
hitasha.chugh@globallogic.com,DISA
shital.sharma@globallogic.com,RBC Bank
geetesh.garg@globallogic.com,"Insurity, Liberty Mutual"
kaushik.kandaswamy@globallogic.com,JH
karanbir.sidhu@globallogic.com,"T Mobile, CSC "
farida.khan2@globallogic.com,Walgreens
rahil.sareen@globallogic.com,"FIS, Western Union"
ramit.kasturia@globallogic.com,"DISA, Pearson, KinderCare, JHA"
ihor.kucheruk@globallogic.com,"WBA, Medtronic"
kartik.arora@globallogic.com,JHA
volodymyr.novak@globallogic.com,"Disney, Discovery, Globosat, SNI, Epix, Bell, etc"
olga.manzhai2@globallogic.com,"Walgreens, Fortrea, Humana, Guardian"
v.polivtseva@globallogic.com,"WBA, Brighthealth, Hitachi Vantara, BMC Software, UMC (Vodafone), Netcracker"
saharsh.taneja@globallogic.com,SAP
mayur.jaganiya@globallogic.com,"Wex, Envestnet"
vasanth.mammula@globallogic.com,DISA
nagarajan.iyer@globallogic.com,S&P Global
vibhu.shekhar@globallogic.com,"Lowes, Expedia"
halyna.m.trishch@globallogic.com,MDT
danielle.workman@globallogic.com,"Symantec, Veritas, Deloitte, Keepit, Hyland, Agilent, Disney"
sanjana.kapoor@globallogic.com,"Google, Petco, Mars Petcare, Cradles to Crayons, Odigo"
rajdeep.roy@globallogic.com,"Fiserv, JP Morgan and Chase, Discovery (South Africa), ATB Bank, CIBC Bank, Westen Union, Convera"
hanna.ahakhanova@globallogic.com,"Discovery (South Africa)"
puneet.gupta5@globallogic.com,"FIS, Royal Bank of Canada"
raghavendra.ems@globallogic.com,"Kohl, Experian, Wood Mackenzie, Nojima, iCIMS "
jawad.ashraf@globallogic.com,"JPMorgan Chase, Supply Chain, 3PL"
bhaskar.g.gandi@globallogic.com,"Kohls, WIlliams Sonoma, BNY Mellon "
abisoye.durodola@globallogic.com,"TD Bank, Access Bank IN, Polaris Bank, First Bank"
o.malinovskyi@globallogic.com,"Verizon, Ericsson"
`;

const DOMAIN_EXP_DETAILS: Record<string, string> = {
    "priyanka.chaturvedi@globallogic.com":`1- Accounting / Invoice and Billing  / API -  Insurity client to automate the Entire Billing system in Sepecaility Lines of Insurnce.
2- Insurance/ Financial Reporting  -  Insurity /Direct Line Group UK , Scottish Life Insurance - Worked on Policy Admin , Underwriritng , Rating and Notice for frontend , Backend and Portals in SAAS system
3. GDPR / SOAP UI - Direct Line group - For Insurance client developed the selef Service portal as per GDPR guideline
 4. Asset Management / Investment Management / Pension Product / Wealth Management /SOAP UI / Sql  - Nucles,Scottish Life , 
 5. Core Banking Loan / Mortgage / Credit Bureau Reporting / Data Platfrom / Sql  - FInastra `,
    "ninad.lokhande@globallogic.com":`Lytx Data Platform: Fleet management - Data platform and data analytics through mounted devices. Telematics solutions, iOT devices`,
    "angelah.charles@globallogic.com":`Predictive Maintenance - AI Based models for Business Jets (Aerospace)
Company: Bombardier 

Maintenance and Data Visualization - Sensor data from Business Jets (Aerospace)
Company: Bombardier

CRM - SAP Marketing Cloud - B2B marketing solution (SAAS)
Company: SAP

Healthcare : MRI Imaging & Workflow software
Company: Siemens `,
    "rafael.monsalvo@globallogic.com":`Telecom: Telus. High-speed fibre optics networks.
Loblaws: Shoppers Drugmart website - In-store products search and availability`,
    "vishal.marwah@globallogic.com":`Customer Loyalty: Expedia
E-learning: Pearson
Education Technology (EdTech): Pearson, micro-services
Travel Technology: Expedia`,
    "elena.gordiyenko2@globallogic.com":`Healthcare sub-domains - Clients NDA. Expertise on hospital administration portal,  applications for implantable devices (cardio), applications for diabetes pump uploads, reporting and analytics.
Financing, Billing and Invoicing - Client NDA. Expertise on testing and writing requirements/coordinating delivery as PO and SM for web portal with e-billing, reporting, analytics, monitoring compliance etc for insurance companies managing their litigation management 
Technology sub-domains - Clients NDA. Worked with big data - writing requirements and testing data warehouse reports
Consumer sub-domains - Clients NDA. Worked with e-commerce web shops for clothes and fundraising as PO and QA. 
Media & Entertainment sub-domains: Clients NDA. Worked as QA on testing cross posting for personal website and communications on social media and SMS/email for e-commerce websites`,
    "stefanus.suswanto@globallogic.com":`WEX - expertise on data platform / data integration / reporting needs; Manulife - expertise on data lake, Data Governance, analytics and BI; Amadeus - expertise on travel / transportation reservation technology`,
    "serhii.naumov@globallogic.com":`Real Estate, Inventory Management/Order Fulfillment: JLL. Computerized maintenance management systems (CMMS), Facility Management (maintenance and operational profile of commercial buildings, industrial facilities, and related outdoor sites), Work Order Management, Preventative Maintenance, Asset Management, Data Centers Management and Inspection, spare parts inventory management, warranty tracking, billing.

Financial Reporting, Financial Analytics: Deutsche Bank. Financial reporting for Top Tier Investment Bank - Liquidity Reporting & Analytics.

Payment Processing: Bottomline Technologies, Inc. Online banking and payments platform, payment processing, cash management.

OSS & BSS system engineering: Netcracker Technology. Implementation and customization of the automated OSS solutions for the orchestration of traditional and digital services.

Network, billing & operations, Fixed Network Infrastructure, Telecom Services: Fast Forward. Systems integration and maintenance, implementation of integrated IT solutions.`,
    "alla.rapp@globallogic.com":`CRM: SFDC. Telecommunication, Mobile, AI, Billing: T-Mobile. Healthcare: one of the biggest European medical provider. Manufacturing: one of the biggest European producers of elevators and escalators.`,
    "vijay.s.mahadev@globallogic.com":`EdTech: Edureka - Education technology`,
    "rashmi.shrivastava@globallogic.com":`Consumer: Kohls, Zappos, Gamestop, Michael Kors, Dollar General, Belcorp - Ecommerce Omnichannel Platforms, Web Content Production, Catalog Management, PIM, Inventory Management, Order Fulfillment, Visual Merchandizing, Loyality etc

Talent Management  - iCIMS  ( Recruitment, Onboarding)

Healthcare - Mars Petcare (VCA) Vet Practice Management System (Hospital Adminstration)

EdTech - Pearson Elearning (Content management & Publishing)`,
    "ajitha.kolla@globallogic.com":`Automotive: Ford Motor Company as a Product Manager: Cloud Infrastructure, PaaS, SaaS, IaaS platforms, loyalty platform, Mobile application, content management, CDN, IoT, OTA
Consumer Sub Domains: Ford Loyalty Platform and Dealer applications: Dealer applications, integrations, training and loyalty platform implementation, Big data, data lakes, data platform
Healthcare Sub Domains: WBA: Patient management, Pharmacy process, campaign management and metrics
Communication Sub Domains: Vizio: Data platform, embedded system networks, OTT flow
Technology Sub Domains: Motorola Solutions, Ford Motor Company, GlobalLogic
Miscellaneous Domains: Motorola Solutions, Ford Motor Company, GlobalLogic: Leadership and management experience.`,
    "lesia.hlynka@globallogic.com":`Healthcare: Medtronic. Expertise on web apps for patients, guardians, care partners and clinics. Integration between mobile apps and web apps. Consents management. Reports based on the patients' data`,
    "namit.dhingra2@globallogic.com":`Industrial Sub Domain
Client names: Alstrong Composite panel. 
Level: Expert, Expertise on the following areas: Managing assembly line manufacturing process, presales and supply chain audit.`,
    "kamalpreet.kaur@globallogic.com":`Health Care:  Mars Pet Care.-  Electronic Medical Record, Pharmacy, Medical Devices, Diagnostics, Prognosis, Patient and Client Accounts,  Visit Management, Hospital/Clinical Communications. 

Education Technology (EdTech):  
Pearson. - Online Quizzes and Assessments, Interactive Learning Solutions
NIIT Technology. - Assessment Creation, Educational Content Development, Learning Management Systems (LMS)

Retail Solutions: Vestcom. - Digital Campaign Creation, Electronic Shelf Label (ESL) Systems, Retail Display Solutions, Printing of Shelf Labels, Tags and Signs.

Customer Relationship Management (CRM): 
CEB. - Client Engagement Strategies, Lead Generation and Management, Sales Force.

Data Management and Business Intelligence (BI): iYogi, CEB, Aon hewitt. - Database Development, Extract, Transform, Load (ETL) Processes, Data Warehousing, Business Intelligence Solutions

Benefits Administrations:  Aon Hewitt.-  Defined Benefits, Defined Contributions, Health Care Benefits, Retirement Plans, Employee Wellness Program.`,
    "hitasha.chugh@globallogic.com":`Domain/Industry name:PE, Client Name: DISA , Expertise on Background Checking,Drug Testing,Occ Health order placement and Fullfilment and managemet of client accounts.`,
    "shital.sharma@globallogic.com":`1. Format: Banking & Finance
Core Banking - Loan
Mortgages
Payment Gateways
Credit Bureau Reporting
Core Banking - Deposit
Financial Analytics
Real Estate
Client- RBC Bank
Led teams in implementing solutions for credit cards, loans, deposits, financial analytics, mortgages, real estate, and payment gateways.
2. Format: Cloud Migration
SaaS (Software as a Service)
Cloud Transformation/Platforms
Client: Global Logic Client. Currently working with a GL client to migrate their applications to Azure Cloud. The project involves a mix of migration strategies tailored to their specific needs: lift & shift, refactoring, and rebuilding.
3. Format: ECommerce.
Marketplace/E-commerce Platforms
Mobile-Commerce
Inventory Management/Order Fulfillment
Payment Processing
Product Catalog Management
Customer Service
Customer Loyalty
Social Media and Online Advertising
Clients: Successfully collaborated with multiple clients across industries to launch and optimize their e-commerce websites.`,
    "geetesh.garg@globallogic.com":`Insurance: Insurity - Claims System Assessment
Insurance: Liberty Mutual - Vendor Assessment `,
    "kaushik.kandaswamy@globallogic.com":`Finance: JH. Intermediate on Core Banking Solution product related to Accounts, Entity`,
    "pranita.bargale@globallogic.com": `Healthcare Analytics - Insurance, Data and AI Platforms`,
    "karanbir.sidhu@globallogic.com":`T-Mobile Inc, Bellevue, WA                                                                        Nov 2011- TILL DATE
Role: Senior Product Owner, Senior Technical Product Manager Senior Product Manager, Senior Project Manager, Senior Program Manager, Senior Technical Delivery Manager, Senior Portfolio Manager, Product & Technology Delivery Manager and Senior Technical Project Manager

Worked in various role mentioned above to manage projects initiated by P&T for various departments such as Business to Business (B2B), Finance, Enterprise IT, Human Resources, Legal, Marketing, Supply Chain, Billing, Dealer Financial Services, Reporting, Commissions, Auditing and Data Analysis, Portfolio Management, Vendor Management, Agile,.Net, Postpaid, Prepaid, Power BI, Single Sign On, Cerner Visual Studio, Mobile Broadband products, Jira Align, Clarity. Product Owner in Agile software product development environment. My responsibility visualizes E2E Solution by translating business requirements across domains, serving as Liaison between business and technology team, managing resource for work assignment and deliverables, sound knowledge of creating UI and API requirements, reviewing swaggers from domains, identify integration dependencies, providing weekly update to Project Steering Committee, managing vendor deliverables, managing scope, cost and schedule, swagger creation and draft enhancements as per solution needs, managing all phases for project from intake, requirements gathering, design, build, testing, deployment and post deployment support, creating L2/L3 sequence diagrams, managing communication between Business Solutions team, Architecture team, development teams and EPO to enable team collaboration, Understand NFRs required for creating the integrations, Be the Single Point of contact to share Project status with VP’s and managed RFQ, RFI, RFP. 

Computer Sciences Corporation (CSC), CSC, Sterling, VA                             May 05- Oct 11                                                                                           
CSC was IT Consulting company to provide information technology (IT) services and professional services and currently known as DXC Technology. I worked as Senior Technical Project Manager, Senior Portfolio Manager, Senior SAP Project Manager, Senior Technical Project Manager, Senior Technical Delivery Manager, Program Manager, SAP SD Team Lead & Process Manager, Portfolio Management and Vendor Management.`,
    "farida.khan2@globallogic.com":`Healthcare: Walgreens. Expertise in managing the application to address patients for adherence to their medication.`,
    "rahil.sareen@globallogic.com":`Consumer: Client NDA, E2E ecommerce marketplace, payment gateways, order management, inventory management 

Healthcare: Client NDA, Clinical trials, pharmacy management and HIS

Finance: Client FIS, Core banking 

Finance: Client Western Union, Payments

Technology: Client NDA Machine learning & model training `,
    "ramit.kasturia@globallogic.com":`Employee Background Checks : DISA ,  Education Technology (EdTech) : Pearson and KinderCare. Maps : Kokisyo Kogyo on Platform Development, Finance : JHA on Modernization of Core Banking`,
    "ihor.kucheruk@globallogic.com":`Healthcare: WBA. Expertise in Pharmacy.
Healthcare: Medtronic, ResMed. Expertise in Software as Medical Device, Remote Patient Monitoring.
Technology: Client-NDA, WBA, Medtronic, ResMed. Expertise in API.
Technology: Medtronic. Expertise in Identity and Access Management (IAM).`,
    "kartik.arora@globallogic.com":`Finance: Jack Henry and Associates  - Wire Transfers - Served as a TBA/Product Owner for almost 3 years with GlobalLogic in a strategic project ‘Core Shared Services – Domestic Wire Transfers (Fedwire)’ aligned with US Banking guidelines (FAIM Format 3.0.5).

Finance: Jack Henry and Associates - Engaged with client to build product backlog by writing technical specifications of API features which has allowed GL offshore team & onsite team to work and developed vital functionalities in Entity Services module within Digital Core system for Jack Henry

Finance: Client - NDA - Payments - Transaction Banking- Domestic & International Payments, FX & Multiple Currency Concepts

Finance: Client - NDA - Lending - Automation of the Loan Processing for SME’s of Bank BTPN, Indonesia through Newgen’s Loan Origination System (LOS). Also developed Scoring System Model for Risk Rating/Credit Analysis which mainly includes Qualitative Credit Assessment (QCA), Customer Selection Criteria (CSC) and Credit Limit Determination (CLD).

Consumer: Client - NDA - Loyalty & Sales & Distribution Management -  Sales & Distribution Management, Loyalty & Redemption Catalogue, Automation of Distributor & Retailer onboarding`,
    "volodymyr.novak@globallogic.com":`Media/Broadcasting, Content Management, Rights Management, Finance Management: Operative(former Sintec Media, former Pilat Media). Worked as Developer and later as Solution Architect for the product called IBMS which is Integrated Broadcast Management System for clients across the globe(Disney, Discovery, Globosat, SNI, Epix, Bell, etc).`,
    "olga.manzhai2@globallogic.com":`Walgreens, Fortrea, Humana, Guardian`,
    "v.polivtseva@globallogic.com":`Healthcare: WBA, Brighthealth. Expertise on Pharmacy Billing and Data Reconciliation for various types of claims.
Automotive/PaaS: DRB Systems (Aftermarket services). B2B carwash platform.
Cloud Transformation/Platform/IaaS: Hitachi Vantara. Storage Management System
Telecom: UMC (Vodafone), Netcracker. Revenue Assurance & Fraud Prevention Expertise, Billing Systems.
SaaS: BMC. Expertise on core ITSM system.
Workforce Management: ARS. Workforce management system.`,
    "saharsh.taneja@globallogic.com":`IOT experience in SAP Labs for developing SaaS and PaaS`,
    "mayur.jaganiya@globallogic.com":`Technology: WEX (GL Client) & Envestnet | Yodlee (Previous Employer) - SaaS, Data Platform. `,
    "nagarajan.iyer@globallogic.com":`S&P Global - Data as a service, Data Strategy, Data governance `,
    "vibhu.shekhar@globallogic.com":`Consumer: Lowes - Expertise in Vendor Allowance Accounting 
Consumer: Expedia - Expertise in Biometric authentication`,
    "halyna.m.trishch@globallogic.com":`1. Healthcare: 1 - MDT; 2 - Hospital Administration/Telemedicine (Client NDA); 2. Education/Travel - Client NDA `,
    "sanjana.kapoor@globallogic.com":`Supply Chain: Google
Salesforce, E2E supply chain solution

Retail/Healthcare: Petco Health and Wellness Company, Inc. 
Payment Gateway, Payment authentication, Loyalty programs, IBM® WebSphere Commerce, Subscription Plans,  Subscription reactivation, Reporting, Coupon.

Healthcare: Mars Petcare
PMS Client and Patient module, in-house communication tool

Retail: Cradles to Crayons
Non-profit, MVP E2E solution, Donation program, social media integration, Salesforce, Delivery implementation, Matching Engine, Reporting

CRM Contact Center as a Service: Odigo
Automated Marketing, Outbound, Inbound, CCaaS Solution, Campaign, Reporting`,
    "puneet.gupta5@globallogic.com":`Sales/CRM: FIS Global. Lead Product manager for CRM, Billing & CPQ systems
Data Platform: FIS Global. Lead Product Manager for Data platform related to revenue operations
Finance: Royal Bank of Canada. Product Owner for Financial Service cloud implementation`,
    "arup.bhattacharjee@globallogic.com": `Mining/Intermediate`,
    "sandeep.choudhary@globallogic.com": `Not applicable`,
    "raghavendra.ems@globallogic.com":`Retail -  Kohls - MAP Project / Sign Management and Inventory management
BFSI (Credit Rating) - Experian -  Customer facing market place and application (Web and Mobile)
Data and Analytics- Wood Mackenzie - data analytics product
Energy - Nojima and other EV pre-sales initiatives 
Talent Management  and background checks - icims and similar products  
Worked on e-learning projects in the past and also `,
    "bhaskar.g.gandi@globallogic.com":`Consumer: Kohls, WIlliams Sonoma - Ecommerce, omnichannel, Fraud, Loyalty, Data Platforms, API platforms
Finance: BNY Mellon - Invest Management, Asset Servicing, Trading`,
    "hanna.ahakhanova@globallogic.com":`Consumer: Client-NDA. Expertise on Mobile eCommerce.
Industrial: 3M AAD. Expertise on Manufacturing and Supply Chain.
Technology: 3M CBG. Expertise on Data Platform`,
    "o.malinovskyi@globallogic.com":`Communication Service Providers/Mobile Network Infrastructure: Verizon. Expertise on building the data analytics tool for Verizon 5G Home Internet which included data for network infrastructure.
Communication Service Providers/Fixed Network Infrastructure: Ericsson. Expertise on maintaining and enhancing the OSS/BSS solution with the focus on inventory management system for wired infrastructure.
Communication Service Providers/Telecom Services: Ericsson. Expertise on maintaining and enhancing the OSS/BSS solution that covered 40+ services from POTS to VDSL.
Network Providers/OSS & BSS system engineering: Ericsson. Expertise on maintaining and enhancing the OSS/BSS solution with the focus on 2 systems - inventory management and order flow management.
Technology/API: Ericsson. Expertise on developing API for internal test management system.`,
    "vasanth.mammula@globallogic.com":`1. Client: DISA (Employee Background Checks, Cloud Transformation/Platforms, BigData, API)
2. Retail Client: NDA(Cloud Transformation/Platforms, BigData, API)
3. BMS Client: NDA (SaaS (Software as a Service), API)
4. Health Care Client; NDA (Healthcare Infrastructure)- Specifically worked on EDI.
5. Retail Energy Client: NDA (Utilities), also worked on EDI.
6. Banking Client: NDA (Payment Processing)`,
    "tuba.meric@globallogic.com":`1) Healthcare, API, SOAP UI Expertise: Stericycle, Carenet Health, Medtronic / 2) Any Finance Experience: Ziraat Bank, SelecTransportation Resources / 3) Any HR related experience: UniCredit Bank / 4) Logistics, Transportation, Supply Chain, CRM, Aftermarket Sales, Sales: SelecTransportation Resources / 5) CRM, Content Management, Social Media: Deloitte`,
    "n.v.lytvynenko@globallogic.com": `Entreatment: Client - NDA. Experience: Supply and Demand Management`,
    "balaji.kumar@globallogic.com":`Telecom: Ericsson & ATT. Expertise on OSS systems
Banking: NDA. Expertise on core banking`,
    "darryl.johnson@globallogic.com": ``,
    "abisoye.durodola@globallogic.com":`Finance - TD Bank, Access Bank INC, Polaris Bank, First Bank
eCommerce, EdTech - NDA - via Consulting firm`,
    "naveen.bhalla@globallogic.com":`GL multiple projects or advisories done with the domains/sub domains where the level of expertise is marked `,
    "jolly.sharma@globallogic.com":`GHX healthcare supply chain management`
};

const GEN_AI_DATA: {email: string, technologies: string, details: string}[] = [
    {email: 'abisoye.durodola@globallogic.com', technologies: 'Customer Experience & Chatbot', details: 'Access Bank INC.'},
    {email: 'alla.rapp@globallogic.com', technologies: 'It was AIML', details: 'AIML for Forecasting and Smart Ticketing in Telecommunication for T-Mobile'},
    {email: 'jolly.sharma@globallogic.com', technologies: 'LLM', details: 'Kearney GenAI'},
    {email: 'naveen.bhalla@globallogic.com', technologies: `Generative AI (Azure OpenAI, Chat GPT & Prompt Engineering) capabilities to automate code conversion process by crafting a Code Conversion Smart Utility.  Won Writer's Cafe Season 4 Award by writing a blog on "Unleashing Innovation - The role of Generative AI Product Manager"`, details: `As a Senior Product Owner, the goal was to closely work with the solution architects and leverage Generative AI (Azure OpenAI, Chat GPT & Prompt Engineering) capabilities to automate the code conversion process by crafting a Code Conversion Smart Utility. The utility intended to automate the code migration from the existing ASP.NET frontend application to Next.js. The build solution significantly streamlined the migration process and reduced manual efforts.`},
    {email: 'ninad.lokhande@globallogic.com', technologies: 'Data Platform, Consumer initiatives, prompt engineering', details: 'Hitachi GenAI'},
    {email: 'o.malinovskyi@globallogic.com', technologies: 'Large Language Models (GPT-3, Copilot), Text-to-Image Models (DALL-E, MidJourney)', details: "I didn't work with it for specific Clients or Projects, I'm utilizing them for my personal needs."},
    {email: 'puneet.gupta5@globallogic.com', technologies: 'Chat GPT', details: 'Havent worked on any client projects yet'},
    {email: 'rashmi.shrivastava@globallogic.com', technologies: 'I have done ideation and usage of GenAI Technologies. Yet to work on any project.', details: 'Sales Ideation for Michael Kors, Belcorp.'},
    {email: 'sandeep.choudhary@globallogic.com', technologies: 'Leading the GEN AI work for BSC NA group', details: ''},
];

const PRE_SALES_DATA: Record<string, string> = {
    "Bhaskar Gandi": `PE: DMSI - ERP`,
    "Elena Gordiyenko": `Healthcare: MDT - Porting applications to new generation platform`,
    "Farida Khan": `Rogers, Telus`,
    "Geetesh Garg": ``,
    "Jolly Sharma": `GHX, Lytx, Sleep Number,`,
    "Kamalpreet Kaur": `Client engagement: CEB- decision support,`,
    "Kartik Arora": `CONTRIBUTIONS & INITIATIVES IN BSC, INDIA

Finance: Finastra - Preparation of Financial Ecosystem for GlobalLogic existing clients in BFSI space. Also worked on Organizational research and opportunity areas and GL synergy for Finastra in Banking & Financial Services domain. Contributed towards preparation of RFP responses and Business proposal for Finastra.

Finance(Insurance): Britecore - Contributed towards industry and organization research, opportunity areas and GL synergy for Britecore in Insurance domain

Finance(Lending): Mortgage Cadence - Industry analysis, organization research, opportunity areas

Communication Service Providers: Zayo Group - Industry analysis, organization research, opportunity areas and GL synergy

Healthcare: MARS Wellness - Collaborated with Design team for MARS Wellness for Innovation ideas and opportunity areas 

Industrial: Apollo PE - Industry analysis, organization research, opportunity areas for Shutterfly (Digital Printing industry) one of the targeted companies in the PE portfolio`,
    "Kaushik Kandaswamy": `Finance: CUNA - Compliance Management System`,
    "Naveen Bhalla": ``,
    "Ninad Lokhande": `Industrial: Hitachi IEAS - Supply Chain Management, 
Industrial: Kokusai Kogyo-Geo Spatial Information system
Entertainment: Tokyo Dome Center-Geo Spatial Information system and data analytics
Technology: Google Test Businss Analyst- Technology  Microservices
Health insurance: Oscarhealth- Technology - Data Platform
Finance: Experian-Technology - Data Platform`,
    "Olga Manzhai": `Tickets Network - ticketing system, Solomoto - social media business platform, Guardian - insurance portal, Humana - voice enablement for Pharmacy; Walgreens - prescriptions processing app; Fortrea - clinical trials digital transformation`,
    "Raghavendra EMS": `Retail -  Kohls - MAP Project / Sign Management and Inventory management
BFSI (Credit Rating) - Experian -  Customer facing market place and application (Web and Mobile)
Data and Analytics- Wood Mackenzie - data analytics product
Energy - Nojima and other EV pre-sales initiatives `,
    "Ramit Kasturia": `Eduction: KinderCare - CMS , Maps: Kokisoy Kogyo - Platform Development , Finance: JHA - Authorization Management`,
    "Rashmi Shrivastava": `Tata McGraw Hills - EdTech, Elearning
Gamestop - Retail, Audit Management
Eyecare Partners - Healthcare, Practice Management System
Petco - Healthcare, Retail
A+E Network - Product Management for Media & Entertainment 
Dollar General - Retail 
Belcorp - Retail
Capri Holding (Michael Kors) - Retail`,
    "Sandeep Choudhary": `Tomoe- Storage Management solutions, USIC-Utlities Management, LINQ- K12 ERP System`,
    "Sanjana Kapoor": `Finance: Britecore Advisory - P&C Insurance ecosystems
Healthcare: webPT
Healthcare: GHX- Consulting RPA Proposal for Automation
Healthcare: Mobile Health AG - POV creation
Digital Transformation Services: iLink Systems- POV creation
Communications: Zayo - POV creation
Retail: Petco - Presales`,
    "Vibhu Shekhar": `Consumer: Lowes - Accounting, Walgreens - Retail Pharmacy, Expedia - Biometric authentication`,
    "Vishal Marwah": `Medical Technology: Eye care partners, Hospitality & Travel: Alaska Airlines`,
    "Vladyslava Polivtseva": `CSP: Verizon - Checkout/Account Upgrade for Web/Mobile`,
    "Volodymyr Novak": `Media Broadcasting, helping with RFP/RFI responses, participating in RFP demo call with potential customer`,
};

const PRE_SALES_OUTSIDE_GL_DATA: Record<string, string> = {
    "Abisoye Durodola": `Finance: Access Bank INC. - Payment Gateway, Cards Switching, Loyalty Programs, Insurance`,
    "Ajitha Kolla": `Public Safety, Loyalty Platform, Over the Air Software Updates`,
    "Angelah Lincy Charles Regina": `ERP - B2B marketing - Cloud based Solution - SAP`,
    "Ihor Kucheruk": `Banks and Payment companies - Payments, Self-Service Machines and ATMs`,
    "Lesia Hlynka": `eCommerce marketplace, education platform, social networking, dashboards, movies platform - gathering requirements, creating SRS and suggesting MVP`,
    "Puneet Gupta": `IT Transformation in Govt. Departments`,
    "Rafael Monsalvo": `Pemex, Telcel - Networking and cybersecurity Cisco products`,
    "Shital Sharma": `Client: NielsenIQ, Technology: SaaS (Software-as-a-Service) for CPG Anamytical solutions for Retailers and Manufacturers, Role: Product Manager, Responsibilities: Presented and demonstrated cloud-based solutions to potential clients, Utilized sales data from stores and consumer surveys to showcase solution capabilities, Assisted in customizing solutions to fit client needs during pre-sales engagements, Provided expertise in store segmentation, clustering, and sales forecasting to support client discussions.`,
    "Vijay Sourab Singh Seetaram Mahadev": `Education: Edureka - Customer Procurement`
};


// Data Processing Logic

function parseCsv(data: string, delimiter = ','): string[][] {
  return data.trim().split('\n').slice(1).map(line => 
    line.split(delimiter).map(cell => cell.trim().replace(/^"|"$/g, ''))
  );
}

const employeesMap = new Map<string, Employee>();

// 1. Process Master Sheet
parseCsv(MASTER_SHEET_DATA).forEach(row => {
  const [name, email, jobTitle, location, reportingManager, project] = row;
  if (email) {
    const lowerEmail = email.toLowerCase();
    employeesMap.set(lowerEmail, {
      id: lowerEmail,
      name,
      email: lowerEmail,
      jobTitle,
      location,
      reportingManager,
      project,
      expertise: [],
      domainExperienceDetails: '',
      clients: [],
      certifications: [],
      genAIExperience: false,
      preSalesExperience: '',
      preSalesExperienceOutsideGL: '',
    });
  }
});

const nameToEmailMap = new Map<string, string>();
employeesMap.forEach(emp => nameToEmailMap.set(emp.name.toLowerCase(), emp.email));

// 2. Process Expertise A
EXPERTISE_A_DATA.trim().split('\n').slice(1).forEach(line => {
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const domain = parts[0].trim();
    const experts = (parts[1] || '').replace(/"/g, '').split(',').map(n => n.trim()).filter(Boolean);
    const intermediates = (parts[2] || '').replace(/"/g, '').split(',').map(n => n.trim()).filter(Boolean);

    const addExpertise = (names: string[], level: 'Expert' | 'Intermediate') => {
        names.forEach(name => {
            const email = nameToEmailMap.get(name.toLowerCase());
            if (email) {
                const employee = employeesMap.get(email);
                if (employee && !employee.expertise.some(e => e.domain === domain)) {
                    employee.expertise.push({ domain, level });
                }
            }
        });
    };
    addExpertise(experts, 'Expert');
    addExpertise(intermediates, 'Intermediate');
});

// 3. Process Expertise B
parseCsv(EXPERTISE_B_DATA).forEach(row => {
    const [domain, primaryExperts] = row;
    const names = primaryExperts.split('/').map(n => n.replace(/\(.*?\)/g, '').trim());
    names.forEach(name => {
        const email = nameToEmailMap.get(name.toLowerCase());
        if (email) {
            const employee = employeesMap.get(email);
            if(employee) {
                const existing = employee.expertise.find(e => e.domain === domain);
                if(existing) existing.level = 'Primary Expert';
                else employee.expertise.push({ domain, level: 'Primary Expert' });
            }
        }
    });
});

// 4. Process Certifications
const certsByEmail = new Map<string, string[]>();
parseCsv(CERT_DATA).forEach(row => {
    const [email, cert] = row;
    if(email && cert) {
        const lowerEmail = email.toLowerCase();
        if(!certsByEmail.has(lowerEmail)) certsByEmail.set(lowerEmail, []);
        certsByEmail.get(lowerEmail)?.push(cert);
    }
});
certsByEmail.forEach((certs, email) => {
    const employee = employeesMap.get(email);
    if(employee) employee.certifications = [...new Set(certs)];
});

// 5. Process Client Names
parseCsv(CLIENT_NAMES_DATA).forEach(row => {
    const [email, clientString] = row;
    if (email && clientString) {
        const employee = employeesMap.get(email.toLowerCase());
        if (employee) {
            employee.clients = clientString.split(',').map(c => c.trim()).filter(Boolean);
        }
    }
});

// 6. Process Details
Object.entries(DOMAIN_EXP_DETAILS).forEach(([email, details]) => {
    const employee = employeesMap.get(email.toLowerCase());
    if (employee) employee.domainExperienceDetails = details;
});

// 7. Process GenAI
GEN_AI_DATA.forEach(genAI => {
    const employee = employeesMap.get(genAI.email.toLowerCase());
    if (employee) {
        employee.genAIExperience = true;
        employee.genAITechnologies = genAI.technologies;
        employee.genAIExperienceDetails = genAI.details;
    }
});

// 8. Process Pre-Sales Experience
Object.entries(PRE_SALES_DATA).forEach(([name, details]) => {
    const email = nameToEmailMap.get(name.toLowerCase());
    if (email) {
        const employee = employeesMap.get(email);
        if (employee) {
            employee.preSalesExperience = details.trim();
        }
    }
});

// 9. Process Pre-Sales Experience Outside GL
Object.entries(PRE_SALES_OUTSIDE_GL_DATA).forEach(([name, details]) => {
    const email = nameToEmailMap.get(name.toLowerCase());
    if (email) {
        const employee = employeesMap.get(email);
        if (employee) {
            employee.preSalesExperienceOutsideGL = details.trim();
        }
    }
});

export const initialEmployees: Employee[] = Array.from(employeesMap.values());

// Generate filter options
const domains = new Set<string>();
const certifications = new Set<string>();
const clients = new Set<string>();
const locations = new Set<string>();
const managers = new Set<string>();

initialEmployees.forEach(emp => {
  emp.expertise.forEach(e => domains.add(e.domain));
  emp.certifications.forEach(c => certifications.add(c));
  emp.clients.forEach(c => clients.add(c));
  if (emp.project && emp.clients.length === 0) clients.add(emp.project);
  if (emp.location) locations.add(emp.location);
  if (emp.reportingManager) managers.add(emp.reportingManager);
});

export const filterOptions = {
  domains: Array.from(domains).sort(),
  certifications: Array.from(certifications).sort(),
  clients: Array.from(clients).sort(),
  locations: Array.from(locations).sort(),
  managers: Array.from(managers).sort(),
};