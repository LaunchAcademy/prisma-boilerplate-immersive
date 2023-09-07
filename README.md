## Prisma App Configured for Student Projects and New Curriculum

```
createdb prisma-test_development
yarn install
cd server
npx prisma migrate reset
cd ..
yarn dev
```

### Missing

- serialization (likely omit)
- yup frontend validation
- cypress db utilities
