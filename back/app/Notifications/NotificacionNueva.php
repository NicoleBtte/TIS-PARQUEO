<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Broadcasting\InteractsWithSockets;

class NotificacionNueva extends Notification implements ShouldBroadcast
{
    use Queueable, InteractsWithSockets;

    public $emisor;
    public $titulo;
    public $mensaje;

    public function __construct($emisor, $titulo, $mensaje)
    {
        $this->emisor = $emisor;
        $this->titulo = $titulo;
        $this->mensaje = $mensaje;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'emisor' => $this->emisor,
            'titulo' => $this->titulo,
            'mensaje' => $this->mensaje,
        ]);
    }

    public function broadcastAs()
    {
        return 'notificacion';
    }
}
