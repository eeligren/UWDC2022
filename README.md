# Training dashboard (UWDC2022)

## Task
Preparing for a Skills-competitions requires a lot of work and dedication. To analyze the
effectiveness of competitors' training, we are creating a time monitoring web application. This
application is used for logging competitors' training sessions. Sessions are stored in a database, and
charts and data tables will help visualize data.

Your task is to build MVP for training time monitor web application - competitors’ and experts’
dashboards. Use our provided prototype to follow the required layout and the functionality of the
application

For more information, check the [task](task.pdf).

## Usage

Deployed version is available from: https://training-dashboard.eeligren.fi/login

**You can login with these credentials:<br>**
Email: competitor1@skill17.com, Password: demopass1<br>
*OR*<br>
Email: competitor2@skill17.com, Password: demopass2<br>
*OR EXPERT:*<br>
Email: expert1@skill17.com, Password: demopass1

- You can login and logout from dashboar
- You can create new training sessions with tags and other data
- You can create new tags, types and categories
- You can order sessions
- You can change order of statistics cards via Drag and Drop.

## Self deployment

To deploy yourself follow these steps:

1. Clone repo to your server or local
2. Run composer install
3. Setup your enviromental variables (database and Pusher)
4. Run migrations and seed data php artisan migrate --seed'
5. Set your webserver document root to /public/index.php file (if running local php artisan serve)
6. Move to /frontend folder
7. Run npm install
8. And npm build / npm run dev depending your enviroment
9. Make sure your API url match your Laravel url .env
10. You are good to go!

You can also check Laravel official deployment docs: https://laravel.com/docs/10.x/deployment

## Author & test project

Solution: Eeli Grén

**Test project (2022):**<br>
Roberts Flaumanis,<br>
Franz Stimpfl,<br>
Margit Tennosaar
