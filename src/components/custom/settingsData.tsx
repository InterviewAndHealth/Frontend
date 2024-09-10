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
    id: "necessaryData",
    label: "Necessary data",
    desc: "Turning this off will limit functionality.",
  },
  {
    id: "usageData",
    label: "Anonymous usage data",
    desc: "This data allows us to make our product better for you.",
  },
  {
    id: "interviewPerformance",
    label: "Your interview performance",
    desc: "This allows use to put together reports for you and also improve our AI",
  },
  {
    id: "yourResponses",
    label: "Your Responses",
    desc: "Allows us to collect your interview responses, assessment responses and also mental diagnostic information to improve our AI for you",
  },
] as const;
const formSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const SettingsData = () => {
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
          Change what data we can use/collect
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
        <Button className="border-2 border-main-300 bg-main-300 text-white  h-14 w-[45%]">
          Download All Your Data
        </Button>
        <br />
        <Button className="border-2 border-[#DE4545] font-bold hover:bg-[#DE4545] hover:text-white bg-white text-[#DE4545] h-14 mt-8 mr-2 w-[45%]">
          Turn Off All Except necessary
        </Button>
        <Button className="border-2 border-[#DE4545] font-bold hover:bg-[#DE4545] hover:text-white bg-white text-[#DE4545] h-14 w-[45%]">
          Delete All Your Data
        </Button>
      </div>
    </>
  );
};

export default SettingsData;
