from django.db import models

# Create your models here.

class Document(models.Model):
    page_id = models.CharField(max_length=256)
    trigger_content = models.CharField(max_length=256)
    probability =  models.DecimalField(decimal_places=4, max_digits=10)

    def __str__(self):
        return self.page_id


