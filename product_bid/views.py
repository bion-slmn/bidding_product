from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import ProductSerializer, BidSerializer
from .models import Product, Bid
from rest_framework.permissions import IsAdminUser
from django.utils.timezone import now



class ProductCreate(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ProductList(APIView):
    
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductBidView(APIView):
    '''create a bid on a product'''
    def post(self, request, product_id):
        product = Product.objects.get(pk=product_id)
        bid_data = request.data.copy()
        bid_data['product'] = product.id  
        serializer = BidSerializer(data=bid_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(product=product, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request, product_id):
        ''' view hightest bids for a product'''
        product = Product.objects.get(pk=product_id)
        highest_bid = product.get_highest_bid()
        return Response(highest_bid)
    

class ProductAvailbletoBid(APIView):
    
    def get(self, request):
        products = Product.objects.filter(bidding_end_time__gt=now())
        if products  is None:
            return Response('[]')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)