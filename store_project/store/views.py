from django.shortcuts import render
from .models import Product, Category, Order

def product_list(request):
    category_list=Category.objects.all()
    search_query = request.GET.get('search', None)
    if search_query:
        product_list = Product.objects.filter(title__icontains = search_query)
    else:
        product_list=Product.objects.all()
    return render(
        request,
        "store/product_list.html", 
        context={'product_list': product_list, 'category_list': category_list}
    )

def product_detail(request, pk):
    product=Product.objects.get(pk=pk)
    category_list=Category.objects.all()
    return render(request, "store/product_detail.html", 
                  context={'product': product, 'category_list': category_list})

def category_detail(request, pk):
    categ=Category.objects.get(pk=pk)
    category_list=Category.objects.all()
    return render(request, "store/category_detail.html", 
                  context={'category': categ, 'category_list': category_list})

def save_order(request):
    product=Product.objects.get(pk=request.POST["product_id"]) 
    order=Order()
    order.username = request.POST["username"]
    order.phone_number = request.POST["phone"]
    order.product = product
    order.save()
    return render(
        request, 
        "store/save_order.html",
        context={'order': order}
        )