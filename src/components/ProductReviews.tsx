import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: number;
  usuario_id: string;
  calificacion: number;
  comentario: string;
  fecha_creacion: string;
  usuario_nombre?: string;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    calificacion: 0,
    comentario: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load reviews
  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      
      // Get reviews with user profiles
      const { data: reviewsData, error } = await supabase
        .from('resenas')
        .select(`
          id,
          usuario_id,
          calificacion,
          comentario,
          fecha_creacion,
          profiles!inner(nombre_completo)
        `)
        .eq('producto_id', productId)
        .order('fecha_creacion', { ascending: false });

      if (error) throw error;

      const formattedReviews = reviewsData?.map(review => ({
        ...review,
        usuario_nombre: review.profiles?.nombre_completo || 'Usuario Anónimo'
      })) || [];

      setReviews(formattedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las reseñas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, calificacion: rating }));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Debes iniciar sesión",
        description: "Para escribir una reseña debes estar registrado",
        variant: "destructive",
      });
      return;
    }

    if (newReview.calificacion === 0) {
      toast({
        title: "Calificación requerida",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.comentario.trim()) {
      toast({
        title: "Comentario requerido",
        description: "Por favor escribe un comentario",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      // Check if user already reviewed this product
      const { data: existingReview, error: checkError } = await supabase
        .from('resenas')
        .select('id')
        .eq('producto_id', productId)
        .eq('usuario_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingReview) {
        toast({
          title: "Ya has reseñado este producto",
          description: "Solo puedes escribir una reseña por producto",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('resenas')
        .insert({
          producto_id: productId,
          usuario_id: user.id,
          calificacion: newReview.calificacion,
          comentario: newReview.comentario.trim()
        });

      if (error) throw error;

      toast({
        title: "Reseña enviada",
        description: "Tu reseña ha sido publicada exitosamente",
      });

      setNewReview({ calificacion: 0, comentario: '' });
      setShowForm(false);
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la reseña",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.calificacion, 0) / reviews.length 
    : 0;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando reseñas...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Reseñas del producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-medium">
                {averageRating.toFixed(1)} de 5
              </span>
              <Badge variant="secondary">
                {reviews.length} reseña{reviews.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            {user && (
              <Button
                onClick={() => setShowForm(!showForm)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Escribir reseña
              </Button>
            )}
          </div>

          {/* Review Form */}
          {showForm && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Calificación
                    </label>
                    {renderStars(newReview.calificacion, true, handleStarClick)}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Comentario
                    </label>
                    <Textarea
                      placeholder={`Cuéntanos qué te pareció ${productName}...`}
                      value={newReview.comentario}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comentario: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={submitting || newReview.calificacion === 0}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {submitting ? 'Enviando...' : 'Enviar reseña'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setNewReview({ calificacion: 0, comentario: '' });
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!user && (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Debes <button className="text-primary hover:underline">iniciar sesión</button> para escribir una reseña
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.usuario_nombre}</span>
                      <Badge variant="outline" className="text-xs">
                        {new Date(review.fecha_creacion).toLocaleDateString()}
                      </Badge>
                    </div>
                    {renderStars(review.calificacion)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comentario}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Aún no hay reseñas para este producto.
                {user ? ' ¡Sé el primero en escribir una!' : ' Inicia sesión para escribir la primera.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};