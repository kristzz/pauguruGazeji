# pauguruGazeji

## Tech stack     

- Next.js
- Laravel
- SQLite
- SVGs from [heroicons](https://heroicons.com/)               
Color s:
wait #f7fcf7
blu #0e416b
redele #d14945

FONT: Space Grotesk


## Setup     

### Laravel backend setup     

```
Navigate to the backend directory

cd backend
cp .env.example .env
composer install
php artisan key:generate   
php artisan passport:keys    
php artisan migrate     
php artisan db:seed      
php artisan passport:client --personal   
```

### Next.js frontend setup

```
Navigate to the Next.js frontend directory:        

cd frontend        
npm install
```
## Development
### Running in parallel
```
1. Start the frontend development server:

cd frontend    
npm run dev

2. Start the Laravel backend server:

cd backend   
sudo ./vendor/bin/sail up

uz windows atveriet vscode vai jebkuru terminali izmantojat kaa admin:
./vendor/bin/sail up
