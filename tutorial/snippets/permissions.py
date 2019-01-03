################# TUTORIAL CODE #################
from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom read only.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        else:
        	return request.user.is_staff


class IsOrdererOrDelivererOrReadOnly(permissions.BasePermission):
    """
    Custom read only.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the snippet.
        elif obj.deliverer == None:
        	return True
        else:
        	return obj.deliverer == request.user or obj.orderer == request.user
        		