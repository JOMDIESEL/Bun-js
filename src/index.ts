import { Cookie, Elysia, t } from "elysia";
import {} from "@elysiajs/cookie";
import {} from "@elysiajs/jwt"
import { BooksDatabase } from "./db";

const app = new Elysia().use(cookie()).use(jwt({
  
})).decorate("db", new BooksDatabase());
app.get("/books", ({ db }) => db.getBooks());
app.post("/books", ({ db, body }) => db.addBook(body), {
  body: t.Object({
    name: t.String(),
    author: t.String(),
  }),
});
app.put("/books", ({db,body}) => db.updateBook(body.id,{name: body.name, author:body.author}),
{
  body: t.Object({id: t.Number(),
    name: t.String(),
    author: t.String(),
  })
  
});




app.get("/books/:id", ({db,params}) => db.getBooks(parseInt(params.id)));
app.delete("/books/:id", ({db,params}) => db.deleteBook(parseInt(params.id)));
app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
