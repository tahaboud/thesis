from rest_framework import serializers, viewsets, status, generics, permissions
from rest_framework.response import Response
from .serializers import SupplierSerializer, EquipementSerializer, ToolsSerializer, WorkOrderSerializer
from .models import Supplier, Equipement, Tools, WorkOrder
from accounts.models import Account
from reportlab.pdfgen import canvas
import time
from django.http import FileResponse
import os
from pathlib import Path
import io
from django.conf import settings

def getDate():
    year = str(time.localtime().tm_year)
    month = str(time.localtime().tm_mon) if len(str(time.localtime().tm_mon))==2 else "0" + str(time.localtime().tm_mon)
    day = str(time.localtime().tm_mday) if len(str(time.localtime().tm_mday))==2 else "0" + str(time.localtime().tm_mday) 
    hour = str(time.localtime().tm_hour) if len(str(time.localtime().tm_hour))==2 else "0" + str(time.localtime().tm_hour)
    mins = str(time.localtime().tm_min) if len(str(time.localtime().tm_min))==2 else "0" + str(time.localtime().tm_min)
    return year+"_"+month+"_"+day+"_"+hour+"_"+mins
            
        


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
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class WorkOrderAPI(viewsets.ModelViewSet):

    def create(self, request):
        request.data.update({"created_by": request.user.pk, "updated_by": request.user.pk})
        serializer = WorkOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            equipement = Equipement.objects.get(pk=serializer.data["equipement"])
            user = Account.objects.get(pk=serializer.data["created_by"])
            date = getDate()
            file_name = equipement.code + "'s Work Order "+ date + ".pdf"
            if (os.path.exists("static\\"+file_name)):
                open("static\\"+file_name, "a").close()
            pdf = canvas.Canvas("static\\"+file_name)
            pdf.setTitle(equipement.code+"'s work order" )
            pdf.setFontSize(36)
            pdf.drawCentredString(270, 770, equipement.code+"'s work order")
            pdf.setFontSize(18)
            pdf.drawString(30, 720, "This work order is created by: "+ user.username)
            pdf.drawString(30, 680, "This work order is created on: "+str(time.localtime().tm_year)+"/"+str(time.localtime().tm_mon)+"/"+str(time.localtime().tm_mday)+
                    " "+str(time.localtime().tm_hour)+":"+str(time.localtime().tm_min))
            pdf.line(30, 640,550,640)
            pdf.drawString(30, 600, "Equipement: "+equipement.code)
            pdf.drawString(30, 560, "Failed Piece: "+serializer.data["failed_piece"])
            pdf.drawString(30, 520, "Repair Piece: "+serializer.data["repair_piece"] if serializer.data["repair_piece"] != "" else "N/A")
            pdf.drawString(30, 480, "Maintenance Starts On: "+serializer.data["maintenance_start_time"][:10]+ ", At:" + serializer.data["maintenance_start_time"][11:16])
            pdf.drawString(30, 440, "Maintenance Ends On: "+serializer.data["maintenance_end_time"][:10]+ ", At:" + serializer.data["maintenance_end_time"][11:16])
            pdf.line(30, 400, 550, 400)
            if (serializer.data["comment"]!=""):
                pdf.drawString(30, 360, "Comment: "+ serializer.data["comment"])
            else:
                pdf.drawString(30, 360, "Comment: " + "N/A")
            pdf.showPage()
            pdf.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            time.localtime()
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
        serializer = WorkOrderSerializer(workOrders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        return Response(serlalizer.data, status=status.HTTP_200_OK)



