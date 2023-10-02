from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Product(models.Model):
    title = models.CharField(max_length=255,db_index=True)
    info = models.TextField(blank = True)
    price = models.IntegerField()
    categories = models.ManyToManyField("Category", blank=True, related_name='products' )
    image = models.ImageField(upload_to="images/", default="images/default.png")

    def __str__(self) -> str:
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=255,db_index=True)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name_plural="Categories"


class Order(models.Model):
    username = models.CharField(max_length=100)
    phone_number = PhoneNumberField()
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
        
    def __str__(self) -> str:
        return self.username