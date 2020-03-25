# CommerceIQ

## Heroku

```
https://commerceiq-github-gaurisankarj.herokuapp.com/:organization/:repository/:statistic
```

## Local, PORT=3000

```
// To run server
npm start

// Test API on local
http://localhost:3000/:organization/:repository/:statistic
```

### API

> Input : Organization Name, Repository Name, Statistic Name [contributor, commit_activity, code_frequency, participation, punch_card]

> Output : CSV file of statistic given as input

* **URL**
  
  ```
  /:organization/:repository/:statistic
  ```

* **Method:**

  ```
  GET
  ```

* **URL Params**
  
  ```
  /:organization/:repository/:statistic
  ```

* **Success Response:**
  * ***Code:*** 200
* **Error Response:**
  * ***Code:*** 404 RESOURCE NOT FOUND
  * ***Code:*** 400 BAD REQUEST
* **Sample Call:**

  ```
  curl https://commerceiq-github-gaurisankarj.herokuapp.com/google/truth/commit_activity
  ```

## R

> Plots inside R folder
