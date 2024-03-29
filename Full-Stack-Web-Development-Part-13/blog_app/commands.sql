13.2

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0 NOT NULL
);

insert into blogs (author, url, title) values ('J.K.Rowling', 'harrypotter.com', 'Harry Potter');
insert into blogs (author, url, title) values ('Tung', 'tung.com', 'Cloud Computing');
