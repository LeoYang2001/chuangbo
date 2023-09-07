import * as z from "zod";


   //   await createVoyage({
    //     author: userId,
    //     voyageNumber: 'V123',
    //     portToll: 'Port A',
    //     departure: '2023-08-22',
    //     arrival: '2023-08-25',
    //     status:"pending",
    //   });
export const VesselValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
  voyageNumber: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  portToll: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  departure: z.date({
    required_error: "A date of birth is required.",
  }),
  arrival: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});