from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    bidding_end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def is_bidding_active(self):
        return now() < self.bidding_end_time
    
    def get_highest_bid(self):
        highest_bid = self.bids.order_by('-amount').first()
        return highest_bid.amount if highest_bid else None

class Bid(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='bids')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid by {self.user.username} - {self.amount}"

    class Meta:
        ordering = ['-amount']  # Highest bid first
