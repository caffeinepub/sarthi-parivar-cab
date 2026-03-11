import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      tripType: string;
      pickupCity: string;
      dropCity: string;
      pickupDate: string;
      pickupTime: string;
      mobile: string;
      name?: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        data.tripType,
        data.pickupCity,
        data.dropCity,
        data.pickupDate,
        data.pickupTime,
        data.mobile,
        data.name ?? null,
      );
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
  });
}
