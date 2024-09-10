import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";
const items = [
  {
    id: "pushNotifications",
    label: "Push Notifications",
    desc: "Notifications right to your desktop",
  },
  {
    id: "jobAlerts",
    label: "Job Alerts",
    desc: "Get Notifications when a job matching your profile is found",
  },
  {
    id: "assesmentProgress",
    label: "Assesment Progress",
    desc: "Get notifications when a assesment is initiated",
  },
  {
    id: "mockInterviewReport",
    label: "Mock Interview Report",
    desc: "Get notifications when your mock interview reports are ready",
  },
  {
    id: "marketingNotifications",
    label: "Marketing Notifications",
    desc: "Get notifications about our products",
  },
] as const;
const formSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const SettingsNotifications = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }
  return (
    <>
      <div className="w-full">
        <h1 className="font-bold text-2xl text-main-300  pt-4 mb-6">
          Edit Your Notification Preferences
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-4 mt-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                className="mt-5"
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="flex flex-col">
                              <FormLabel className="font-bold text-lg">
                                {item.label}
                              </FormLabel>
                              <FormLabel className="font-bold text-sm text-main-50">
                                {item.desc}
                              </FormLabel>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className=" hidden">
              Submit
            </Button>
          </form>
        </Form>
        <h3 className=" text-main-300 font-bold mt-5 mb-3">Support</h3>
        <Button className="border-2 border-[#DE4545] hover:bg-[#DE4545] font-bold hover:text-white bg-white text-[#DE4545] h-14 w-[45%]">
          Turn off all Notifications
        </Button>
      </div>
    </>
  );
};

export default SettingsNotifications;
