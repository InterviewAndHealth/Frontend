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
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { FiMinusCircle } from "react-icons/fi";
const formSchema = z.object({
  preferredCity: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  skills: z.array(z.string()).nonempty("Select at least one skills"),
  services: z.array(z.string()).nonempty("Select at least one service"),
  workMode: z.array(z.string()).nonempty("Select at least one work mode"),
});

const UserPreferences = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredCity: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className=" w-full h-full">
        <div
          className="  h-full bg-cover flex items-center justify-center sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat"
          style={{
            backgroundPosition: "left, right",
          }}
        >
          <div className="bg-white w-11/12 lg:w-3/4 border-2 h-full px-10 py-5 lg:px-40 lg:py-5 border-main-300 rounded-xl my-10">
            <h2 className="text-main-300 px-2 font-bold text-4xl md:text-5xl text-center my-4">
              What are you looking for?
            </h2>
            <span className="text-main-300 text-center my-5 block">
              Let us know your job preferences so we can match you to jobs.
            </span>
            <Button
              type="submit"
              className=" bg-main-300 h-14 rounded-xl w-52 text-wrap lg:py-0 lg:px-12 mt-4 text-white font-normal text-sm mx-auto block"
            >
              Get suggestions from your resume
            </Button>
            <span className="text-main-300 text-center mx-auto w-full lg:w-1/3 my-5 block">
              We’ll Use our AI to go through your Resume and suggest positions
              according to your skills, you can still edit them below.
            </span>
            <span className="text-main-300 text-center my-5 block text-xs">
              Please make sure your preferences are correct.
            </span>

            <div className="flex items-center justify-center my-4 font-bold">
              <div className="flex-grow border-2 border-main-50"></div>
              <span className="mx-4 text-main-50">or</span>
              <div className="flex-grow border-2 border-main-50"></div>
            </div>

            <h4 className="text-main-300 font-bold text-xl lg:text-2xl text-center ">
              Choose your preferences
            </h4>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="w-full lg:w-[45%] mx-auto mt-3">
                  <h3 className=" text-main-300 font-bold -mb-1 ml-3">
                    Skills you’d like to use
                  </h3>
                  <h5 className="text-main-300 text-[12px] mb-2 ml-3">
                    Click the minus if you do not want related jobs
                  </h5>
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-wrap justify-start"
                          >
                            {[
                              "MERN",
                              "Java",
                              "Python",
                              "Typescript",
                              "UI/UX Design",
                              "Management",
                              "Sales",
                              "Human Resources",
                            ].map((value) => (
                              <ToggleGroupItem
                                key={value}
                                value={value}
                                aria-label="Toggle bold"
                                className="border-main-300 border-2  rounded-lg text-main-300 mr-1"
                              >
                                {value}
                                <FiMinusCircle className="h-4 w-4 ml-2" />
                              </ToggleGroupItem>
                            ))}

                            <Button className="border-main-300 border-2 bg-white text-main-300 rounded-lg hover:bg-main-300 hover:text-white">
                              Add another
                            </Button>
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className=" text-main-300 font-bold mt-5 mb-2 ml-3">
                    What are you preparing for?
                  </h3>
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-wrap justify-start"
                          >
                            {[
                              "MBA",
                              "Civil Services",
                              "Internships",
                              "Full-time",
                              "Freelance",
                              "Contract",
                            ].map((value) => (
                              <ToggleGroupItem
                                key={value}
                                value={value}
                                aria-label="Toggle bold"
                                className="border-main-300 border-2 rounded-lg text-main-300 mr-1"
                              >
                                {value}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className=" text-main-300 font-bold mt-5 mb-2 ml-3">
                    Work Mode
                  </h3>
                  <FormField
                    control={form.control}
                    name="workMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-wrap justify-start"
                          >
                            {["Remote", "In-Office", "Hybrid"].map((value) => (
                              <ToggleGroupItem
                                key={value}
                                value={value}
                                aria-label="Toggle bold"
                                className="border-main-300 border-2  rounded-lg text-main-300 mr-1"
                              >
                                {value}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="preferredCity"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[45%] mx-auto">
                      <FormLabel className="text-main-300 font-bold ml-4">
                        Preferred City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className=" bg-main-300 h-14 rounded-xl w-full lg:w-[45%] text-white font-normal text-base mx-auto block"
                >
                  Confirm
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPreferences;
