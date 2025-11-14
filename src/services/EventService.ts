import ApiService from "./ApiService";

interface UserData {
  username: string;
  email: string;
  fullName: string;
}

const EventService = {
  /**
   * Register a user for an event
   */
  async registerForEvent(
    eventId: number,
    userData: UserData,
    _token: string
  ): Promise<any> {
    try {
      const response = await ApiService.postWithAuth(
        `/api/events/${eventId}/register`,
        userData
      );
      return response;
    } catch (error) {
      console.error("Error registering for event:", error);
      throw error;
    }
  },

  /**
   * Cancel event registration
   */
  async cancelRegistration(
    eventId: number,
    username: string,
    _token: string
  ): Promise<any> {
    try {
      const response = await ApiService.deleteWithAuth(
        `/api/events/${eventId}/register`,
        { username }
      );
      return response;
    } catch (error) {
      console.error("Error cancelling registration:", error);
      throw error;
    }
  },

  /**
   * Get event by ID
   */
  async getEventById(eventId: number): Promise<any> {
    try {
      const response = await ApiService.get(`/api/events/${eventId}`);
      return response;
    } catch (error) {
      console.error("Error getting event:", error);
      throw error;
    }
  },

  /**
   * Check if user is registered for an event
   */
  async getRegistrationStatus(
    eventId: number,
    username: string,
    token: string
  ): Promise<any> {
    try {
      const response = await ApiService.get(
        `/api/events/${eventId}/registration-status?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error getting registration status:", error);
      throw error;
    }
  },

  /**
   * Get all registrations for a specific user
   */
  async getUserRegistrations(username: string, token: string): Promise<any> {
    try {
      const response = await ApiService.get(
        `/api/events/user/${username}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error getting user registrations:", error);
      throw error;
    }
  },

  /**
   * Get all registrations for a specific event (admin only)
   */
  async getEventRegistrations(eventId: string, token: string): Promise<any> {
    try {
      const response = await ApiService.get(
        `/api/events/${eventId}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error getting event registrations:", error);
      throw error;
    }
  },

  /**
   * Get all events with their registrations (admin only)
   */
  async getAllEventsRegistrations(token: string): Promise<any> {
    try {
      const response = await ApiService.get("/api/events/all/registrations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error getting all events registrations:", error);
      throw error;
    }
  },
};

export default EventService;
