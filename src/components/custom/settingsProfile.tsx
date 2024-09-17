import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { FiMinusCircle } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import { Progress } from "@radix-ui/react-progress";
import { LuMic } from "react-icons/lu";
import { Label } from "../ui/label";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits.")
    .max(15, "Phone number must be at most 15 digits.")
    .regex(/^\+?[\d\s-()]{7,15}$/, "Invalid phone number format."),
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  textStyles: z.array(z.string()).nonempty("Select at least one style"),
});
const SettingsProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      textStyles: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="w-full">
        <h1 className="font-bold text-2xl text-main-300  pt-4 mb-6">
          Edit Your Details
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main-300 font-bold ml-4">
                    Change Your Email
                  </FormLabel>
                  <FormControl>
                    {/* Wrap Input and Button in a Flex Container */}
                    <div className="flex items-center space-x-3 w-full">
                      <Input
                        placeholder="doe@gmail.com"
                        {...field}
                        className="w-[45%]"
                      />
                      <Button
                        type="submit"
                        className="ml-2 bg-main-300 h-14 rounded-xl w-[45%] text-white font-normal text-base"
                      >
                        Verify Email
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-main-300 font-bold ml-4">
                    Change Your Phone Number
                  </FormLabel>
                  <FormControl>
                    {/* Wrap Input and Button in a Flex Container */}
                    <div className="flex items-center space-x-3 w-full">
                      <Input
                        placeholder="123456789"
                        {...field}
                        className="w-[45%]"
                      />
                      <Button
                        type="submit"
                        className="ml-2 bg-main-300 h-14 rounded-xl w-[45%] text-white font-normal text-base"
                      >
                        Verify Number
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-3 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-[45%]">
                    <FormLabel className="text-main-300 font-bold ml-4">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-[45%]">
                    <FormLabel className="text-main-300 font-bold ml-4">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-3">
              <div className="w-[45%]">
                <h1 className="font-bold text-2xl text-main-300  pt-4 mb-6">
                  Edit Your Preferences
                </h1>
                <h3 className=" text-main-300 font-bold -mb-1">
                  Skills you’d like to use
                </h3>
                <h5 className="text-main-300 text-[12px] mb-2">
                  Click the minus if you do not want related jobs
                </h5>
                <FormField
                  control={form.control}
                  name="textStyles"
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
                              className="border-main-300 border-2 text-main-300 mr-1"
                            >
                              {value}
                              <FiMinusCircle className="h-4 w-4 ml-2" />
                            </ToggleGroupItem>
                          ))}

                          <Button className="border-main-300 border-2 bg-white text-main-300">
                            Add another
                          </Button>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[45%] mt-16">
                <div>
                  <h3 className=" text-main-300 font-bold mb-3">
                    What are you preparing for?
                  </h3>
                  <FormField
                    control={form.control}
                    name="textStyles"
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
                                className="border-main-300 border-2 text-main-300 mr-1"
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
                  <h3 className=" text-main-300 font-bold mt-5 mb-3">
                    Work Mode
                  </h3>
                  <FormField
                    control={form.control}
                    name="textStyles"
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
                                className="border-main-300 border-2 text-main-300 mr-1"
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
              </div>
            </div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-[45%]">
                  <FormLabel className="text-main-300 font-bold ml-4">
                    Preferred City
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Add a location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <h3 className=" text-main-300 font-bold mt-5 mb-3">Support</h3>
        <Dialog>
          <DialogTrigger className="border-2 border-[#DE4545] rounded-lg bg-white font-bold hover:bg-[#DE4545] hover:text-white text-[#DE4545] h-14 w-[45%]">
            Delete Your account
          </DialogTrigger>
          <DialogContent className="h-1/2 lg:w-2/5 w-[90%] rounded-xl border border-main-300">
            <DialogHeader>
              <DialogTitle className="text-[#DE4545]  font-bold text-4xl text-center mt-4 mb-2">
                Delete Your Account
              </DialogTitle>
              <DialogDescription className="text-[#DE4545] text-md text-center mt-4 w-3/4 mx-auto">
                Deleting your account will remove your active subscription and
                refund your money.
              </DialogDescription>

              <div className=" flex flex-col b items-center py-5">
                <Label
                  htmlFor="email"
                  className="text-[#DE4545] w-1/2 font-bold mb-1 ml-4"
                >
                  Type in Your Email to proceed
                </Label>
                <Input
                  type="email"
                  placeholder="ex:johndoe@gmail.com"
                  className="w-1/2  border-[#DE4545] text-[#DE4545] placeholder:text-[#DE4545]"
                />
              </div>
              <div className="flex justify-center space-x-3 pt-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-main-100 text-white h-14 w-[30%] hover:text-white hover:bg-main-100"
                  >
                    Go Back
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="secondary"
                  className="border-2 border-[#DE4545] rounded-lg bg-white font-bold hover:bg-[#DE4545] hover:text-white text-[#DE4545] h-14 w-[30%]"
                >
                  Confirm Delete
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SettingsProfile;
