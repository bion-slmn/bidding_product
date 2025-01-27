from .views import ProductCreate, ProductBidView, ProductAvailbletoBid, ProductList
from django.urls import path

urlpatterns = [
    path('view/', ProductList.as_view(), name='product_view'),
    path('create/', ProductCreate.as_view(), name='product_create'),
    path('bids/create/<int:product_id>/', ProductBidView.as_view(), name='product_bid_creatre'),
    path('bids/view/<int:product_id>', ProductBidView.as_view(), name='product_bid_view'),
    path('bids/available/', ProductAvailbletoBid.as_view(), name='product_available')
]