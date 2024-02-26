import { Formik, Form, Field } from "formik"
import FormField from "@/web/components/ui/FormField"

const InputForm = ({ initialValues, handleSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    enableReinitialize={true}
  >
    <Form>
      <FormField name="title" placeholder="Enter a title" className="mb-4"/>
      <Field name="description" placeholder="Enter a description" as="textarea"  className="border-2 shadow w-full py-3 px-3 focus:outline-none"/>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4">
        Submit
      </button>
    </Form>
  </Formik>
)

export default InputForm
