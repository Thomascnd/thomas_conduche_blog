# thomas_conduche_blog

- This project concerns an application that allows users to consult published articles. Authors can publish their own articles. The application also includes a comments section to encourage interaction. It also features an administration interface dedicated to user management.

## To install the packages required by the application, run the following command:
```npm i```

## Create an .env.local file containing your database information, API keys, the variable for signing the JWT token, and the "pepper" for the security password.

## You will need to perform a migration to configure your database with this command:

```npx knex migrate:latest```


## You can use this command to populate your database with fictitious users, posts and comments.
```npx knex seed:run```

## You can start the server with the following command:
```npm run dev```