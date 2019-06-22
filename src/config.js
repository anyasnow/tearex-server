module.exports = {
    PORT: process.env.PORT || 8800,
    NODE_ENV: process.env.NODE_ENV || 'production',
    DB_URL: process.env.DB_URL || 'postgresql://anya-snow@localhost/tearex',
}