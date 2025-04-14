"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTerm, setLoanTerm] = useState(20)
  const [monthlyIncome, setMonthlyIncome] = useState(100000)

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const numberOfPayments = loanTerm * 12

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments)) /
      (Math.pow(1 + ratePerMonth, numberOfPayments) - 1)

    return Math.round(emi)
  }

  const emi = calculateEMI()
  const eligibleLoanAmount = monthlyIncome * 60
  const isEligible = eligibleLoanAmount >= loanAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Home Loan Calculator
        </CardTitle>
        <CardDescription>Check your eligibility and EMI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="loan-amount" className="text-sm font-medium">
              Loan Amount
            </label>
            <span className="text-sm font-medium">₹{loanAmount.toLocaleString()}</span>
          </div>
          <Slider
            id="loan-amount"
            min={500000}
            max={20000000}
            step={100000}
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹5L</span>
            <span>₹2Cr</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="interest-rate" className="text-sm font-medium">
              Interest Rate (%)
            </label>
            <span className="text-sm font-medium">{interestRate}%</span>
          </div>
          <Slider
            id="interest-rate"
            min={6}
            max={15}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="loan-term" className="text-sm font-medium">
              Loan Term (Years)
            </label>
            <span className="text-sm font-medium">{loanTerm} years</span>
          </div>
          <Slider
            id="loan-term"
            min={5}
            max={30}
            step={1}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="monthly-income" className="text-sm font-medium">
            Monthly Income
          </label>
          <Input
            id="monthly-income"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Monthly EMI</p>
            <p className="text-2xl font-bold">₹{emi.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Eligible Loan Amount</p>
            <p className="text-2xl font-bold">₹{eligibleLoanAmount.toLocaleString()}</p>
            <p className={`text-sm ${isEligible ? "text-green-600" : "text-red-600"}`}>
              {isEligible ? "You are eligible!" : "Not eligible for this amount"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply for Home Loan</Button>
      </CardFooter>
    </Card>
  )
}

