from rest_framework import serializers, viewsets, status, generics, permissions
from rest_framework.response import Response
from .serializers import SupplierSerializer, EquipementSerializer, ToolsSerializer, TreeStructureSerializer, WorkOrderSerializer
from .models import Supplier, Equipement, Tools, WorkOrder, TreeStructure


class SupplierAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        request.data.update({"created_by": request.user.pk, "updated_by": request.user.pk})
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            supplier = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        request.data.update({"updated_by": request.user.pk})
        supplier = Supplier.objects.get(pk=pk)
        serializer = SupplierSerializer(supplier, data=request.data, partial=True)
        if serializer.is_valid():
            supplier = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        suppliers = Supplier.objects.all()
        serializer = SupplierSerializer(suppliers, many=True)
        return Response(serializer.data, status=status.HTTP_302_FOUND)


class EquipementAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        request.data.update({"created_by": request.user.pk, "updated_by": request.user.pk})
        serializer = EquipementSerializer(data=request.data)
        if serializer.is_valid():
            equipement = serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        request.data.update({"updated_by": request.data.pk})
        equipement = Equipement.objects.get(pk=pk)
        serializer = EquipementSerializer(equipement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        equipements = Equipement.objects.all()
        serializer = EquipementSerializer(equipements, many=True)
        return Response(serializer.data, status=status.HTTP_302_FOUND)

class ToolsAPI(viewsets.ModelViewSet):

    def create(self, request):
        request.data.update({"created_by": request.user.pk, "updated_by": request.user.pk})
        serializer = ToolsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        request.data.update({"updated_by": request.data.pk})
        tool = Tools.objects.get(pk=pk)
        serializer = ToolSerializer(tool, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        tools = Tools.objects.all()
        serializer = ToolsSerializer(tools, many=True)
        return Response(serlalizer.data, status=status.HTTP_302_FOUND)
    
class WorkOrderAPI(viewsets.ModelViewSet):

    def create(self, request):
        request.data.update({"created_by": request.user.pk, "updated_by": request.user.pk})
        serializer = WorkOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        request.data.update({"updated_by": request.data.pk})
        workOrder = WorkOrder.objects.get(pk=pk)
        serializer = WorkOrderSerializer(workOrder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        workOrders = WorkOrder.objects.all()
        serializer = WorkOrderSerializer(tools, many=True)
        return Response(serlalizer.data, status=status.HTTP_302_FOUND)

class TreeStructureAPI(viewsets.ModelViewSet):

    def create(self, request):
        serializer = TreeStructureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        treeStructure = TreeStructure.objects.get(pk=pk)
        serializer = TreeStructureSerializer(treeStructure, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        treeStructures = Equipement.objects.get(pk=pk).treeStructure
        serializer = TreeStructureSerializer(tools, many=True)
        return Response(serlalizer.data, status=status.HTTP_302_FOUND)



