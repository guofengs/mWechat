const Koa = require("Koa");
const app = new Koa()

const asyncIo = () => {
  return new Promise(resolve => setTimeout(resolve, 500));
}

const mid = () => async (ctx, next) => {
  ctx.body = 'mark';
  await next();
  ctx.body = ctx.body + 'done';
}

app.use(mid());
app.use(async (ctx, next) => {
  await asyncIo();
  ctx.body += 'save'
    await next();
})

app.listen(3000)