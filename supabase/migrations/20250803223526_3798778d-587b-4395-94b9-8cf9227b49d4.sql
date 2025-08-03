-- Actualizar todos los productos para que precio_original sea igual al precio
UPDATE productos 
SET precio_original = precio 
WHERE precio_original IS NULL OR precio_original != precio;