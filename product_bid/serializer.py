from rest_framework import serializers
from .models import Product, Bid

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'

    def validate(self, data):
        product = data['product']
        if not product.is_bidding_active():
            raise serializers.ValidationError("Bidding for this product has ended.")
        
        highest_bid = product.bids.order_by('-amount').first()
        if highest_bid and data['amount'] <= highest_bid.amount:
            raise serializers.ValidationError("Your bid must be higher than the current highest bid.")
        
        if data['amount'] <= product.starting_price:
            raise serializers.ValidationError("Your bid must be higher than the starting price.")
        
        return data
