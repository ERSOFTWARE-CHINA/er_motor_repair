defmodule MotorRepairBackend.Utils.Pdf do
  @moduledoc """
  生成pdf，用于打印维修结算单
  """

  def gen_pdf_from_template() do
    {pdf_alias, pdf_content} = Gutenex.PDF.Templates.load("d:\\3.pdf")
    {:ok, pid} = Gutenex.start_link
    Gutenex.add_template(pid, pdf_alias, pdf_content)
    |> Gutenex.set_template(pdf_alias)
    |> Gutenex.append_to_stream(pdf_content)
    |> Gutenex.export("d:\\3_ok.pdf")
    |> Gutenex.stop
  end


  defp gen_pdf() do
    # Load image, get alias
    # {alpaca_alias, alpaca_rendition} = Gutenex.PDF.Images.load("d:\\3.png")

    {:ok, pid} = Gutenex.start_link
    # Gutenex.add_image(pid, alpaca_alias, alpaca_rendition)
    Gutenex.begin_text(pid)
    |> Gutenex.set_font("Helvetica", 48)
    # |> Gutenex.text_position(40, 180)
    |> Gutenex.text_position(200, 700)
    |> Gutenex.text_render_mode(:fill)
    |> Gutenex.write_text("title")
    |> Gutenex.set_font("Courier", 32)
    |> Gutenex.text_render_mode(:stroke)
    |> Gutenex.write_text("subtitle")
    |> Gutenex.end_text

    |> Gutenex.begin_text
    |> Gutenex.set_font("Helvetica", 24)
    # |> Gutenex.text_position(40, 180)
    |> Gutenex.text_position(140, 650)
    |> Gutenex.text_render_mode(:fill)
    |> Gutenex.write_text("ab01:")
    |> Gutenex.end_text
    # |> Gutenex.move_to(400, 20)
    # |> Gutenex.draw_image(alpaca_alias,
    # %{
    #   translate_x: 300,
    #   translate_y: 500,
    # })
    |> Gutenex.export("d:\\3.pdf")
    |> Gutenex.stop
  end

end