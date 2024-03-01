using Microsoft.AspNetCore.SignalR;

namespace ChatBackend.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage (string message, String user)
        {
            await Clients.All.SendAsync("ReceiveMessage", message, user);
        }
    }
}