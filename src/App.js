import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";
const compoundInterest = (deposit, contribution, years, rate) => {
	let total = deposit;
	for (let i = 0; i < years; i++) {
		total = (total + contribution) * (rate + 1);
	}
	return Math.round(total);
};
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
const App = () => {
	const [balance, setBalance] = useState("");
	const handleSubmit = ({ deposit, contribution, years, rate }) => {
		const val = compoundInterest(
			Number(deposit),
			Number(contribution),
			Number(years),
			Number(rate)
		);
		console.log(val);
		setBalance(formatter.format(val));
	};
	return (
		<Container>
			<Section>
				<Formik
					initialValues={{
						deposit: "",
						contribution: "",
						years: "",
						rate: "",
					}}
					onSubmit={handleSubmit}
					validationSchema={Yup.object({
						deposit: Yup.number()
							.required("Obligatorio")
							.typeError("Debe ser un numero"),
						contribution: Yup.number()
							.required("Obligatorio")
							.typeError("Debe ser un numero"),
						years: Yup.number()
							.required("Obligatorio")
							.typeError("Debe ser un numero"),
						rate: Yup.number()
							.required("Obligatorio")
							.typeError("Debe ser un numero"),
					})}
				>
					<Form>
						<Input name="deposit" label="Depósito Inicial" />
						<Input name="contribution" label="Contribución Anual" />
						<Input name="years" label="Años" />
						<Input name="rate" label="Interés Estimado" />
						<Button type="submit">Calcular</Button>
					</Form>
				</Formik>
				{balance !== "" ? <Balance>Balance final: {balance}</Balance> : null}
			</Section>
		</Container>
	);
};

export default App;
