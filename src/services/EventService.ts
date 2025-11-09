// @ts-expect-error - ApiService is a JS file
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
    eventId: string,
    userData: UserData,
    token: string
  ): Promise<any> {
    try {
      const response = await ApiService.post(
        `/api/events/${eventId}/register`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering for event:", error);
      throw error;
    }
  },

  /**
   * Cancel event registration
   */
  async cancelRegistration(
    eventId: string,
    username: string,
    token: string
  ): Promise<any> {
    try {
      const response = await ApiService.delete(
        `/api/events/${eventId}/register?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling registration:", error);
      throw error;
    }
  },

  /**
   * Get event status (capacity, current registrations)
   */
  async getEventStatus(eventId: string): Promise<any> {
    try {
      const response = await ApiService.get(`/api/events/${eventId}/status`);
      return response.data;
    } catch (error) {
      console.error("Error getting event status:", error);
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
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      console.error("Error getting all events registrations:", error);
      throw error;
    }
  },
};

export default EventService;
