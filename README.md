# RESTful API
##Routs 
```bash
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products",
  });
});```
