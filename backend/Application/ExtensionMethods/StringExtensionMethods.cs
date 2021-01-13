using Castle.Core.Internal;
using System;

namespace Application.ExtensionMethods
{
    public static class StringExtensionMethods
    {
        public static bool IsValidCNPJ(this string cnpj)
        {
            cnpj = cnpj.Trim().Replace("-", "").Replace(".", "").Replace("/", "");

            if (cnpj.Length != 14) return false;

            int[] multipliers1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multipliers2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCnpj = cnpj.Substring(0, 12);
            int sum = 0;

            for (int i = 0; i < 12; i++)
                sum += int.Parse(tempCnpj[i].ToString()) * multipliers1[i];

            int result = (sum % 11);
            if (result < 2)
                result = 0;
            else
                result = 11 - result;

            string digit = result.ToString();
            tempCnpj = tempCnpj + digit;
            sum = 0;
            for (int i = 0; i < 13; i++)
                sum += int.Parse(tempCnpj[i].ToString()) * multipliers2[i];

            result = (sum % 11);
            if (result < 2)
                result = 0;
            else
                result = 11 - result;

            digit = digit + result.ToString();

            return cnpj.EndsWith(digit);
        }

        public static bool IsValidCPF(this string cpf)
        {
            int[] multipliers1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multipliers2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digit;
            int sum;
            int rest;
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");
            if (cpf.Length != 11)
                return false;
            tempCpf = cpf.Substring(0, 9);
            sum = 0;

            for (int i = 0; i < 9; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multipliers1[i];
            rest = sum % 11;
            if (rest < 2)
                rest = 0;
            else
                rest = 11 - rest;
            digit = rest.ToString();
            tempCpf = tempCpf + digit;
            sum = 0;
            for (int i = 0; i < 10; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multipliers2[i];
            rest = sum % 11;
            if (rest < 2)
                rest = 0;
            else
                rest = 11 - rest;
            digit = digit + rest.ToString();
            return cpf.EndsWith(digit);
        }

        public static bool IsValidPhoneNumber(this string phoneNumber)
        {
            if (phoneNumber.IsNullOrEmpty())
                throw new Exception("Invalid phone number.");
            phoneNumber = phoneNumber.Replace("(", "").Replace(")", "").Replace("-", "").Replace("+", "").Trim();

            if (phoneNumber.StartsWith("0") && phoneNumber.Length == 12)
                phoneNumber = phoneNumber.Substring(1, phoneNumber.Length - 1);

            if (phoneNumber.Length != 11)
                throw new Exception("Phone number must contain (ddd) + 9 digits");
            return phoneNumber.Length == 11;
        }
    }
}
