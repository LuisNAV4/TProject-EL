import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthDropdown: React.FC = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [showLogin, setShowLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (user) {
    // Usuario autenticado - mostrar dropdown de usuario
    if (isMobile) {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Cuenta</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col space-y-4 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">Usuario</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Mi Cuenta</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="end">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 p-4 border-b">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">Usuario</p>
              </div>
            </div>
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Usuario no autenticado - mostrar login/registro
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col space-y-4">
            <div className="flex rounded-lg bg-muted p-1">
              <button
                className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all ${
                  showLogin 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setShowLogin(true)}
              >
                Iniciar Sesión
              </button>
              <button
                className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all ${
                  !showLogin 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setShowLogin(false)}
              >
                Registrarse
              </button>
            </div>
            {showLogin ? (
              <LoginForm onSuccess={() => setIsOpen(false)} />
            ) : (
              <RegisterForm 
                onSuccess={() => setIsOpen(false)} 
                onSwitchToLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex rounded-lg bg-muted p-1">
            <button
              className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all ${
                showLogin 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setShowLogin(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all ${
                !showLogin 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setShowLogin(false)}
            >
              Registrarse
            </button>
          </div>
          {showLogin ? (
            <LoginForm onSuccess={() => setIsOpen(false)} />
          ) : (
            <RegisterForm 
              onSuccess={() => setIsOpen(false)} 
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AuthDropdown;