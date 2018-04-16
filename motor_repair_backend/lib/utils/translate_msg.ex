defmodule MotorRepairBackendWeb.TranslateMsg do
  require MotorRepairBackendWeb.Gettext

  def translate_msg(s) do
    Gettext.gettext(MotorRepairBackendWeb.Gettext, s)
  end

  def sigil_t(string, []), do: Gettext.gettext(MotorRepairBackendWeb.Gettext, string)
end