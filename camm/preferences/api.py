from rest_framework import serializers, viewsets, status, generics, permissions
from rest_framework.response import Response
from .serializers import LocalisationSerializer, StockSerializer
from .models import Stock, Localisation


class StockAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        stock = Stock.objects.get(pk=pk)
        serializer = StockSerializer(stock, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LocalisationAPI(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request):
        serializer = LocalisationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        localisation = Localisation.objects.get(pk=pk)
        serializer = LocalisationSerializer(localisation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        localisations = Localisation.objects.all()
        serializer = StockSerializer(localisations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


