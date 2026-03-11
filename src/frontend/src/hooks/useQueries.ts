import { useMutation, useQuery } from "@tanstack/react-query";
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

export function useGetAllInquiries(enabled: boolean) {
  const { actor } = useActor();
  return useQuery({
    queryKey: ["allInquiries"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllInquiries();
    },
    enabled: enabled && !!actor,
    refetchInterval: 30000,
  });
}

export function useGetContactMessages(_enabled: boolean) {
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: async (): Promise<
      Array<
        [
          bigint,
          { name: string; email: string; phone: string; message: string },
        ]
      >
    > => {
      return [];
    },
    enabled: false,
  });
}
