# TigerPost
For codeRIT ClayHack 2020

---

A website which allows the post office to scan a package’s barcode, also known as its Postal Numeric Encoding Technique or POSTNET, and have that information uploaded to a viewable database. Students will be able to view the shipping address and other information associated with the packages they receive. If someone surprises them with a care package or gets an order without tracking information or the tracking information is not properly updating, they can check the shipping address and other information associated with the package to understand what they have received and clear up any mysteries.

---

## How To Install

1) Execute the following commands on your mysql database server:
```mysql
CREATE DATABASE tigerpost;
CREATE USER 'tigerpost'@'<host>' IDENTIFIED WITH mysql_native_password BY '<password>';
GRANT ALL PRIVILEGES ON tigerpost.* TO 'tigerpost'@'<host>';
```
*Note: Change <host> and <password> to their appropate values. If your database server is running on the same server as tigerpost, then set <host> to 'localhost' (no quotes). Randomly generate a password for <password>*
